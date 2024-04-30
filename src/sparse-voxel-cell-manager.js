import * as THREE from 'three';

import {entity} from './entity.js';
import {utils} from './utils.js';
import {voxel_builder_threaded} from './voxel-builder-threaded.js';
import {voxel_shader} from './voxel-shader.js';
import {textures} from './textures.js';
import {texture_defs} from './texture-defs.js';
import {defs} from './defs.js';
import {hack_defs} from './hack-defs.js';

export const sparse_voxel_cell_manager = (() => {

  class SparseVoxelCellManager extends entity.Component {
    static CLASS_NAME = 'SparseVoxelCellManager';

    get NAME() {
      return SparseVoxelCellManager.CLASS_NAME;
    }

    constructor(params) {
      super();
      this.blocks_ = {};
      this.cellDimensions_ = new THREE.Vector3(params.cellSize, params.cellSize, params.cellSize);
      this.visibleDimensions_ = [params.worldSize, params.worldSize];
      this.dirtyBlocks_ = {};
      this.ids_ = 0;
      this.totalTime_ = 0.0;
    }

    InitEntity() {
      // HACK
      this.scene_ = this.FindEntity('renderer').GetComponent('ThreeJSController').scene_;

      this.materialOpaque_ = new THREE.ShaderMaterial({
          uniforms: {
            diffuseMap: {
                value: null,
            },
            noiseMap: {
                value: null,
            },
            fogColour: {
                value: defs.FOG_COLOUR.clone(),
            },
            fogDensity: {
                value: 0.000065,
            },
            fogRange: {
                value: new THREE.Vector2(250, 250),
            },
            fogTime: {
                value: 0.0,
            },
            fade: {
              value: 1.0,
            },
            flow: {
              value: 0.0,
            },
          },
          vertexShader: voxel_shader.VOXEL.VS,
          fragmentShader: voxel_shader.VOXEL.PS,
          side: THREE.FrontSide
      });
      this.materialTransparent_ = this.materialOpaque_.clone();
      this.materialTransparent_.side = THREE.FrontSide;
      this.materialTransparent_.transparent = true;

      this.LoadTextures_();

      this.builder_ = new voxel_builder_threaded.VoxelBuilder_Threaded({
          scene: this.scene_,
          dimensions: this.cellDimensions_,
          materialOpaque: this.materialOpaque_,
          materialTransparent: this.materialTransparent_,
          blockTypes: this.blockTypes_,
      });
    }

    LoadTextures_() {
      this.blockTypes_ = {};
      const textureSet = new Set();
      for (let k in texture_defs.DEFS) {
        const t = texture_defs.DEFS[k];

        this.blockTypes_[k] = {
            textures: [],
        };
        if (t.texture instanceof Array) {
          for (let i = 0; i < t.texture.length; ++i) {
            textureSet.add(t.texture[i]);
            this.blockTypes_[k].textures.push(t.texture[i]);
          }
        } else {
          for (let i = 0; i < 6; ++i) {
            textureSet.add(t.texture);
            this.blockTypes_[k].textures.push(t.texture);
          }
        }
      }

      const textureBlocks = [...textureSet];
      for (let k in this.blockTypes_) {
        for (let i = 0; i < 6; ++i) {
          this.blockTypes_[k].textures[i] = textureBlocks.indexOf(this.blockTypes_[k].textures[i]);
        }
      }

      const path = './resources/minecraft/textures/blocks/';
      const diffuse = new textures.TextureAtlas();
      diffuse.Load('diffuse', textureBlocks.map(t => path + t));
      diffuse.onLoad = () => {
        this.materialOpaque_.uniforms.diffuseMap.value = diffuse.Info['diffuse'].atlas;
        this.materialTransparent_.uniforms.diffuseMap.value = diffuse.Info['diffuse'].atlas;
      };

      const loader = new THREE.TextureLoader();
      const noiseTexture = loader.load('./resources/simplex-noise.png');
      noiseTexture.wrapS = THREE.RepeatWrapping;
      noiseTexture.wrapT = THREE.RepeatWrapping;
      noiseTexture.minFilter = THREE.LinearMipMapLinearFilter;
      noiseTexture.magFilter = THREE.NearestFilter;
      this.materialOpaque_.uniforms.noiseMap.value = noiseTexture;
      this.materialTransparent_.uniforms.noiseMap.value = noiseTexture;
    }

    Key_(x, y, z) {
      return x + '.' + y + '.' + z;
    }

    BlockIndex_(xp, zp) {
      const x = Math.floor(xp / this.cellDimensions_.x);
      const z = Math.floor(zp / this.cellDimensions_.z);
      return [x, z];
    }

    FindBlock_(xp, zp) {
      const [cx, cz] = this.BlockIndex_(xp, zp);
      const k = this.Key_(cx, 0, cz);
      if (k in this.blocks_) {
        return this.blocks_[k];
      }
      return null;
    }

    GetAdjacentBlocks(xp, zp) {
      const blocks = [];
      for (let xi = -1; xi <= 1; ++xi) {
        for (let zi = -1; zi <= 1; ++zi) {
          if (xi == 0 && zi == 0) {
            continue;
          }
          const [cx, cz] = this.BlockIndex_(xp, zp);
          const k = this.Key_(cx + xi, 0, cz + zi);
          if (k in this.blocks_) {
            blocks.push(this.blocks_[k]);
          }
        }
      }
      return blocks;
    }

    InsertVoxelAt(pos, type, skippable) {
      const block = this.FindBlock_(pos[0], pos[2]);
      if (!block) {
        return;
      }

      block.InsertVoxelAt(pos, type, skippable);
    }

    RemoveVoxelAt(pos) {
      const block = this.FindBlock_(pos[0], pos[2]);
      if (!block) {
        return;
      }

      block.RemoveVoxelAt(pos);
    }

    HasVoxelAt(x, y, z) {
      const block = this.FindBlock_(x, z);
      if (!block) {
        return false;
      }

      return block.HasVoxelAt(x, y, z);
    }

    FindVoxelsNear(pos, radius) {
      // TODO only lookup really close by
      const [xn, zn] = this.BlockIndex_(pos.x - radius, pos.z - radius);
      const [xp, zp] = this.BlockIndex_(pos.x + radius, pos.z + radius);

      const voxels = [];
      for (let xi = xn; xi <= xp; xi++) {
        for (let zi = zn; zi <= zp; zi++) {
          const k = this.Key_(xi, 0, zi);
          if (k in this.blocks_) {
            const c = this.blocks_[k];

            voxels.push(...c.FindVoxelsNear(pos, radius));
          }
        }
      }

      return voxels;
    }

    FindIntersectionsWithRay(ray, maxDistance) {
      const voxels = this.FindVoxelsNear(ray.origin, maxDistance);
      const intersections = [];

      const AsAABB_ = (v) => {
        const position = new THREE.Vector3(
            v.position[0], v.position[1], v.position[2]);
        const half = new THREE.Vector3(0.5, 0.5, 0.5);

        const m1 = new THREE.Vector3();
        m1.copy(position);
        m1.sub(half);

        const m2 = new THREE.Vector3();
        m2.copy(position);
        m2.add(half);

        return new THREE.Box3(m1, m2);
      }

      const boxes = voxels.map(v => AsAABB_(v));
      const _TMP_V = new THREE.Vector3();

      for (let i = 0; i < boxes.length; ++i) {
        if (ray.intersectBox(boxes[i], _TMP_V)) {
          intersections.push({
              voxel: voxels[i],
              aabb: boxes[i],
              intersectionPoint: _TMP_V.clone(),
              distance: _TMP_V.distanceTo(ray.origin)
          });
        }
      }

      intersections.sort((a, b) => {
        return a.distance - b.distance;
      });

      return intersections;
    }

    Update(timeElapsed) {
      this.builder_.Update(timeElapsed);
      if (!this.builder_.Busy) {
        this.UpdateTerrain_();
      }

      this.totalTime_ += timeElapsed;
      this.materialOpaque_.uniforms.fogTime.value = this.totalTime_ * 0.5;
      this.materialTransparent_.uniforms.fogTime.value = this.totalTime_ * 0.5;
      this.materialTransparent_.uniforms.flow.value = this.totalTime_ * 0.5;

      // HACK, awful
      const threejs = this.FindEntity('renderer').GetComponent('ThreeJSController');
      threejs.sky_.material.uniforms.whiteBlend.value = this.builder_.currentTime_;
      const player = this.FindEntity('player');
      if (player.Position.y < 6 && !hack_defs.skipOceans) {
        this.materialOpaque_.uniforms.fogRange.value.set(...defs.UNDERWATER_RANGE);
        this.materialTransparent_.uniforms.fogRange.value.set(...defs.UNDERWATER_RANGE);
        this.materialOpaque_.uniforms.fogColour.value.copy(defs.UNDERWATER_COLOUR);
        this.materialTransparent_.uniforms.fogColour.value.copy(defs.UNDERWATER_COLOUR);
        threejs.sky_.material.uniforms.bottomColor.value.copy(defs.UNDERWATER_COLOUR);
      } else {
        this.materialOpaque_.uniforms.fogRange.value.set(...defs.FOG_RANGE);
        this.materialTransparent_.uniforms.fogRange.value.set(...defs.FOG_RANGE);
        this.materialOpaque_.uniforms.fogColour.value.copy(defs.FOG_COLOUR);
        this.materialTransparent_.uniforms.fogColour.value.copy(defs.FOG_COLOUR);
        threejs.sky_.material.uniforms.bottomColor.value.copy(defs.FOG_COLOUR);
      }
      threejs.sky_.material.needsUpdate = true;
      this.materialOpaque_.needsUpdate = true;
      this.materialTransparent_.needsUpdate = true;
    }

    UpdateTerrain_() {
      const player = this.FindEntity('player');
      const cellIndex = hack_defs.fixedTerrainOrigin ?
          this.BlockIndex_(...hack_defs.CAMERA_POS) :
          this.BlockIndex_(player.Position.x, player.Position.z);

      const xs = this.visibleDimensions_[0];
      const zs = this.visibleDimensions_[1];
      let cells = {};

      for (let x = -xs; x <= xs; x++) {
        for (let z = -zs; z <= zs; z++) {
          const xi = x + cellIndex[0];
          const zi = z + cellIndex[1];

          const key = this.Key_(xi, 0, zi);
          cells[key] = [xi, zi];
        }
      }

      const intersection = utils.DictIntersection(this.blocks_, cells);
      const difference = utils.DictDifference(cells, this.blocks_);
      const recycle = Object.values(utils.DictDifference(this.blocks_, cells));

      this.builder_.ScheduleDestroy(recycle);

      cells = intersection;

      const sortedDifference = [];

      for (let k in difference) {
        const [xi, zi] = difference[k];
        const d = ((cellIndex[0] - xi) ** 2 + (cellIndex[1] - zi) ** 2) ** 0.5;
        sortedDifference.push([d, k, difference[k]])
      }

      sortedDifference.sort((a, b) => { return a[0] - b[0]; });

      for (let i = 0; i < sortedDifference.length; ++i) {
        const k = sortedDifference[i][1];
        const [xi, zi] = sortedDifference[i][2];
        const offset = new THREE.Vector3(
            xi * this.cellDimensions_.x, 0, zi * this.cellDimensions_.z);
  
        cells[k] = this.builder_.AllocateBlock({
            parent: this,
            offset: offset
        });
      }


      this.blocks_ = cells;
    }
  }


  return {
      SparseVoxelCellManager: SparseVoxelCellManager,
  };
})();