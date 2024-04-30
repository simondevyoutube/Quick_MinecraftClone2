import * as THREE from 'three';

import {worker_pool} from './worker-pool.js';

import {voxel_block_builder} from './voxel-block-builder.js';
import {hack_defs} from './hack-defs.js';


export const voxel_builder_threaded = (() => {

  
  class SparseVoxelCellBlock {
    constructor(params) {
      this.params_ = params;
      this.voxels_ = {};
      this.group_ = new THREE.Group();
      this.buildId_ = 0;
      this.lastBuiltId_ = -1;
      this.building_ = false;
      this.dirty_ = false;

      // Use this for emergency rebuilds when voxels inserted/deleted.
      this.builder_ = new voxel_block_builder.VoxelBlockBuilder();
      params.scene.add(this.group_);
    }

    Destroy() {
      this.ReleaseAssets_();
      this.group_.parent.remove(this.group_);
    }

    ReleaseAssets_() {
      this.group_.traverse(c => {
        if (c.material) {
          c.material.dispose();
        }
        if (c.geometry) {
          c.geometry.dispose();
        }
      });
      if (this.opaqueMesh_) {
        this.group_.remove(this.opaqueMesh_);
      }
      if (this.transparentMesh_) {
        this.group_.remove(this.transparentMesh_);
      }
    }

    Show() {
      this.group_.visible = true;;
    }

    Hide() {
      this.group_.visible = false;;
    }

    get Destroyed() {
      return !this.group_.parent;
    }

    get Dirty() {
      return this.dirty_;
    }

    Key_(x, y, z) {
      return x + '.' + y + '.' + z;
    }

    InsertVoxelAt(pos, type, skippable) {
      const k = this.Key_(...pos);
      if (k in this.voxels_ && skippable) {
        return;
      }

      const v = {
          position: [...pos],
          type: type,
          visible: true,
      };

      this.voxels_[k] = v;
      this.buildId_++;
      this.dirty_ = true;

      // Get nearby voxels
      const neighbours = this.params_.parent.GetAdjacentBlocks(
          this.params_.offset.x, this.params_.offset.z);
  
      for (let xi = -1; xi <= 1; ++xi) {
        for (let yi = -1; yi <= 1; ++yi) {
          for (let zi = -1; zi <= 1; ++zi) {
            for (let ni = 0; ni < neighbours.length; ++ni) {
              const k = this.Key_(pos[0] + xi, pos[1] + yi, pos[2] + zi);

              if (k in neighbours[ni].voxels_) {
                // Force the neighbour to rebuild since we shared some voxels
                neighbours[ni].buildId_++;
                neighbours[ni].dirty_ = true;
              }
            }
          }
        }
      }
    }

    RemoveVoxelAt(pos) {
      this.buildId_++;
      this.dirty_ = true;

      const params = {
        buildId: this.buildId_,
        offset: this.params_.offset.toArray(),
        dimensions: this.params_.dimensions.toArray(),
        blockTypes: this.params_.blockTypes,
        currentTime: 0.0,
      };

      this.builder_.Init(params);

      // Only write fill voxels if needed
      const kv = this.Key_(...pos);
      this.voxels_[kv].visible = false;
      const fillVoxels = this.builder_.RemoveVoxelAndFill_(pos, this.voxels_);
      for (let k in fillVoxels) {
        this.params_.parent.InsertVoxelAt(
            fillVoxels[k].position, fillVoxels[k].type, true);
      }

      const neighbours = this.params_.parent.GetAdjacentBlocks(
        this.params_.offset.x, this.params_.offset.z);

      for (let xi = -1; xi <= 1; ++xi) {
        for (let yi = -1; yi <= 1; ++yi) {
          for (let zi = -1; zi <= 1; ++zi) {
            for (let ni = 0; ni < neighbours.length; ++ni) {
              const k = this.Key_(pos[0] + xi, pos[1] + yi, pos[2] + zi);

              if (k in neighbours[ni].voxels_) {
                // Force the neighbour to rebuild since we shared some voxels
                neighbours[ni].buildId_++;
                neighbours[ni].dirty_ = true;
              }
            }
          }
        }
      }
    }

    PartialRebuild() {
      const neighbours = this.params_.parent.GetAdjacentBlocks(
          this.params_.offset.x, this.params_.offset.z);

      const neighbourVoxels = {};
      const xn = this.params_.offset.x - 1;
      const zn = this.params_.offset.z - 1;
      const xp = this.params_.offset.x + this.params_.dimensions.x;
      const zp = this.params_.offset.z + this.params_.dimensions.z;
      for (let ni = 0; ni < neighbours.length; ++ni) {
        const neighbour = neighbours[ni];
        for (let k in neighbour.voxels_) {
          const v = neighbour.voxels_[k];
          if (v.position[0] == xn || v.position[0] == xp ||
              v.position[2] == zn || v.position[2] == zp) {
            neighbourVoxels[k] = v;
          }
        }
      }

      const params = {
        buildId: this.buildId_,
        offset: this.params_.offset.toArray(),
        dimensions: this.params_.dimensions.toArray(),
        blockTypes: this.params_.blockTypes,
        currentTime: 0.0,
      };

      this.builder_.Init(params);
      const data = this.builder_.PartialRebuild(this.voxels_, neighbourVoxels);

      this.RebuildMeshFromData(data);

      this.dirty_ = false;
    }

    HasVoxelAt(x, y, z) {
      const k = this.Key_(x, y, z);
      if (!(k in this.voxels_)) {
        return false;
      }

      return this.voxels_[k].visible;
    }

    FindVoxelsNear(pos, radius) {
      const xp = Math.ceil(pos.x + (radius + 1));
      const yp = Math.ceil(pos.y + (radius + 1));
      const zp = Math.ceil(pos.z + (radius + 1));
      const xn = Math.floor(pos.x - (radius + 1));
      const yn = Math.floor(pos.y - (radius + 1));
      const zn = Math.floor(pos.z - (radius + 1));

      const voxels = [];
      for (let xi = xn; xi <= xp; ++xi) {
        for (let yi = yn; yi <= yp; ++yi) {
          for (let zi = zn; zi <= zp; ++zi) {
            const k = this.Key_(xi, yi, zi);
            if (k in this.voxels_) {
              if (this.voxels_[k].visible) {
                voxels.push(this.voxels_[k]);
              }
            }
          }
        }
      }
      return voxels;
    }

    BuildGeometry_(data, mat) {
      const geo = new THREE.BufferGeometry();
      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = false;
      mesh.receiveShadow = true;

      geo.setAttribute(
          'position', new THREE.Float32BufferAttribute(data.positions, 3));
      geo.setAttribute(
          'normal', new THREE.Float32BufferAttribute(data.normals, 3));
      geo.setAttribute(
          'uv', new THREE.Float32BufferAttribute(data.uvs, 2));
      geo.setAttribute(
          'uvSlice', new THREE.Float32BufferAttribute(data.uvSlices, 1));
      geo.setAttribute(
          'colour', new THREE.Float32BufferAttribute(data.colours, 3));
      geo.setIndex(
          new THREE.BufferAttribute(data.indices, 1));
      geo.attributes.position.needsUpdate = true;
      geo.attributes.normal.needsUpdate = true;
      geo.attributes.uv.needsUpdate = true;
      geo.attributes.colour.needsUpdate = true;

      geo.computeBoundingBox();
      geo.computeBoundingSphere();

      return mesh;
    }

    RebuildMeshFromData(data) {
      this.ReleaseAssets_();

      if (data.opaque.positions.length > 0) {
        this.opaqueMesh_ = this.BuildGeometry_(
            data.opaque, this.params_.materialOpaque);
        this.group_.add(this.opaqueMesh_);
      }
      if (data.transparent.positions.length > 0) {
        this.transparentMesh_ = this.BuildGeometry_(
            data.transparent, this.params_.materialTransparent);
        this.group_.add(this.transparentMesh_);
      }

      this.voxels_ = data.voxels;
      this.lastBuiltId_ = data.buildId;
    }
  };

  const _NUM_WORKERS = 7;

  class VoxelBuilder_Threaded {
    constructor(params) {
      this.old_ = [];
      this.blocks_ = [];

      this.workerPool_ = new worker_pool.WorkerPool(_NUM_WORKERS);
  
      this.params_ = params;
      this.currentTime_ = 0.01;
    }

    OnResult_(block, msg) {
      if (msg.subject == 'build_chunk_result') {
        block.RebuildMeshFromData(msg.data);
        block.Show();
      }
    }

    AllocateBlock(params) {
      const blockParams = {...this.params_, ...params};
      const block = new SparseVoxelCellBlock(blockParams);

      block.Hide();

      this.blocks_.push(block);

      this.RebuildBlock_(block);

      return block;    
    }

    RebuildBlock_(block) {
      if (block.building_) {
        return;
      }

      const msg = {
        subject: 'build_chunk',
        params: {
          buildId: block.buildId_,
          offset: block.params_.offset.toArray(),
          dimensions: this.params_.dimensions.toArray(),
          blockTypes: this.params_.blockTypes,
          currentTime: this.currentTime_,
        },
      };

      // HACK
      block.building_ = true;

      this.workerPool_.Enqueue(msg, (m) => {
        block.building_ = false;
        this.OnResult_(block, m);
      });
    }

    ScheduleDestroy(blocks) {
      this.old_.push(...blocks);
    }

    DestroyBlocks_(blocks) {
      for (let c of blocks) {
        c.Destroy();
      }
    }

    get Busy() {
      return this.workerPool_.Busy;
    }

    Update(timeElapsed) {
      if (!this.Busy) {
        this.DestroyBlocks_(this.old_);
        this.old_ = [];
      }

      this.blocks_ = this.blocks_.filter(b => !b.Destroyed);

      for (let i = 0; i < this.blocks_.length; ++i) {
        if (hack_defs.introEnabled) {
          this.RebuildBlock_(this.blocks_[i]);
        }

        if (this.blocks_[i].Dirty) {
          this.blocks_[i].PartialRebuild();
        }
      }

      if (hack_defs.introEnabled) {
        this.currentTime_ += timeElapsed * hack_defs.INTRO_RATE;
      } else {
        this.currentTime_ = 2;
      }
    }
  }

  return {
      VoxelBuilder_Threaded: VoxelBuilder_Threaded,
  };
})();