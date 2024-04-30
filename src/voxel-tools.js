import * as THREE from 'three';

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

import {entity} from './entity.js';
import {voxel_shader} from './voxel-shader.js';
import {hack_defs} from './hack-defs.js';


export const voxel_tools = (() => {

  class VoxelTools_Insert extends entity.Component {
    static CLASS_NAME = 'VoxelTools_Insert';

    get NAME() {
      return VoxelTools_Insert.CLASS_NAME;
    }

    constructor() {
      super();

      this.voxelType_ = 'stone';
      this.timer_ = 0;
      this.active_ = false;
    }

    InitComponent() {
      this._RegisterHandler('input.pressed', (m) => this.OnInput_(m));
      this._RegisterHandler('ui.blockChanged', (m) => this.OnBlockIcon_(m));
      this._RegisterHandler('ui.toolChanged', (m) => this.OnToolChanged_(m));
    }

    OnToolChanged_(msg) {
      if (!hack_defs.showTools) {
        return;
      }

      if (msg.value != 'build') {
        this.LoseFocus();
      } else {
        this.GainFocus();
      }
    }

    LoseFocus() {
      this.voxelMeshGroup_.visible = false;
      this.placementMesh_.visible = false;
      this.active_ = false;
    }

    GainFocus() {
      this.voxelMeshGroup_.visible = true;
      this.placementMesh_.visible = true;
      this.active_ = true;
    }

    OnBlockIcon_(msg) {
      this.voxelType_ = msg.value;
      this.UpdateVoxelMesh_();
    }

    UpdateVoxelMesh_() {
      const voxels = this.FindEntity('voxels').GetComponent('SparseVoxelCellManager');

      const colours = [];
      const uvSlices = [];
      for (let f = 0; f < 6; ++f) {
        for (let i = 0; i < 4 * 3; ++i) {
          colours.push(1.0, 1.0, 1.0);
          uvSlices.push(voxels.blockTypes_[this.voxelType_].textures[2]);
        }
      }
      this.voxelMesh_.geometry.setAttribute(
        'colour', new THREE.Float32BufferAttribute(colours, 3));
      this.voxelMesh_.geometry.setAttribute(
        'uvSlice', new THREE.Float32BufferAttribute(uvSlices, 1));
    }

    InitEntity() {
      // HACK
      const scene = this.FindEntity('renderer').GetComponent('ThreeJSController').scene_;
      const camera = this.FindEntity('renderer').GetComponent('ThreeJSController').uiCamera_;
      const voxels = this.FindEntity('voxels').GetComponent('SparseVoxelCellManager');

      const geo = new THREE.BoxBufferGeometry(1, 1, 1);

      const p1 = new THREE.ShaderMaterial({
          uniforms: {
              time: {value: 0.0},
              edgeColour: { value: new THREE.Color(0x000000) },
          },
          vertexShader: voxel_shader.PLACEMENT.VS,
          fragmentShader: voxel_shader.PLACEMENT.PS,
          side: THREE.FrontSide,
          blending: THREE.NormalBlending,
          transparent: true,
          depthWrite: false,
      });
      const p2 = p1.clone();
      p2.side = THREE.BackSide;

      const m1 = new THREE.Mesh(geo, p1);
      const m2 = new THREE.Mesh(geo, p2);
      m1.renderOrder = 1;
      this.placementMesh_ = new THREE.Group();
      this.placementMesh_.add(m1);
      this.placementMesh_.add(m2);
      this.placementMesh_.scale.setScalar(0.999);
      this.material1_ = p1;
      this.material2_ = p2;

      const voxelGeo = new THREE.BoxBufferGeometry(1, 1, 1);

      this.voxelMesh_ = new THREE.Mesh(voxelGeo, voxels.materialOpaque_.clone());
      this.voxelMesh_.position.set(1.25, -1.25, -4);
      this.voxelMesh_.rotateY(0.125 * 2 * Math.PI);
      this.voxelMesh_.material.depthWrite = false;
      this.voxelMesh_.material.depthTest = false;

      this.voxelMeshGroup_ = new THREE.Group();
      this.voxelMeshGroup_.add(this.voxelMesh_);
      this.voxelMeshGroup_.position.set(0, 0, 2);
      this.voxelMeshRotEnd_ = this.voxelMeshGroup_.quaternion.clone();
      this.voxelMeshGroup_.rotateX(-0.125 * 2 * Math.PI);
      this.voxelMeshRotStart_ = this.voxelMeshGroup_.quaternion.clone();
      this.voxelMeshGroup_.quaternion.identity();

      camera.add(this.voxelMeshGroup_);

      const rotFrames = new THREE.QuaternionKeyframeTrack(
          '.quaternion',
          [0, 1],
          [...this.voxelMeshRotStart_.toArray(), ...this.voxelMeshRotEnd_.toArray()]);
      
      const rotClip = new THREE.AnimationClip('rot', -1, [rotFrames]);

      this.mixer_ = new THREE.AnimationMixer(this.voxelMeshGroup_);
      this.action_ = this.mixer_.clipAction(rotClip);

      scene.add(this.placementMesh_);

      this.UpdateVoxelMesh_();
      this.LoseFocus();
    }

    OnInput_(msg) {
      if (!this.active_) {
        return;
      }

      if (msg.value == 'enter') {
        this.PerformAction();
      }
    }

    PerformAction() {
      if (!this.active_) {
        return;
      }

      if (!this.placementMesh_.visible) {
        return;
      }

      const voxels = this.FindEntity('voxels').GetComponent('SparseVoxelCellManager');
      const possibleCoords = [
          this.placementMesh_.position.x, this.placementMesh_.position.y, this.placementMesh_.position.z];

      if (!voxels.HasVoxelAt(...possibleCoords)) {
        voxels.InsertVoxelAt(possibleCoords, this.voxelType_);

        this.action_.setLoop(THREE.LoopOnce, 1);
        this.action_.clampWhenFinished = true;
        this.action_.timeScale = 3.0;
        this.action_.reset();
        this.action_.play();  
      }
    }

    Update(timeInSeconds) {
      if (!this.active_) {
        return;
      }

      this.mixer_.update(timeInSeconds);
      this.timer_ += timeInSeconds;
      this.material1_.uniforms.time.value = this.timer_;
      this.material2_.uniforms.time.value = this.timer_;
      this.material1_.needsUpdate = true;
      this.material2_.needsUpdate = true;

      // HACK
      const voxels = this.FindEntity('voxels').GetComponent('SparseVoxelCellManager');
      this.voxelMesh_.material.uniforms.diffuseMap.value = voxels.materialOpaque_.uniforms.diffuseMap.value;
      this.placementMesh_.visible = false;
      
      const player = this.FindEntity('player');
      const forward = new THREE.Vector3(0, 0, -1);
      forward.applyQuaternion(player.Quaternion);

      const ray = new THREE.Ray(player.Position, forward);
      const intersections = voxels.FindIntersectionsWithRay(ray, 5).filter(i => i.voxel.visible);
      if (!intersections.length) {
        return;
      }

      const possibleCoords = [...intersections[0].voxel.position];

      // Now pick which side to put block on
      const coords = this.FindClosestSide_(possibleCoords, ray);
      if (!coords) {
        return;
      }

      if (!voxels.HasVoxelAt(...coords)) {
        this.placementMesh_.position.set(...coords);
        this.placementMesh_.visible = true;
      }
    }

    FindClosestSide_(possibleCoords, ray) {
      const sides = [
          [...possibleCoords], [...possibleCoords], [...possibleCoords], 
          [...possibleCoords], [...possibleCoords], [...possibleCoords], 
      ];
      sides[0][0] -= 1;
      sides[1][0] += 1;
      sides[2][1] -= 1;
      sides[3][1] += 1;
      sides[4][2] -= 1;
      sides[5][2] += 1;

      const AsAABB_ = (v) => {
        const position = new THREE.Vector3(...v);
        const half = new THREE.Vector3(0.5, 0.5, 0.5);

        const m1 = new THREE.Vector3();
        m1.copy(position);
        m1.sub(half);

        const m2 = new THREE.Vector3();
        m2.copy(position);
        m2.add(half);

        return new THREE.Box3(m1, m2);
      }

      const boxes = sides.map(v => AsAABB_(v));
      const _TMP_V = new THREE.Vector3();

      const intersections = [];
      for (let i = 0; i < boxes.length; ++i) {
        if (ray.intersectBox(boxes[i], _TMP_V)) {
          intersections.push({
              position: sides[i],
              distance: _TMP_V.distanceTo(ray.origin)
          });
        }
      }

      intersections.sort((a, b) => {
        return a.distance - b.distance;
      });

      if (intersections.length > 0) {
        return intersections[0].position;
      }
      return null;
    }
  };


  class VoxelTools_Delete extends entity.Component {
    static CLASS_NAME = 'VoxelTools_Delete';

    get NAME() {
      return VoxelTools_Delete.CLASS_NAME;
    }

    constructor() {
      super();
      this.timer_ = 0;
      this.active_ = true;
    }

    InitEntity() {
      this.LoadModel_();
    }

    InitComponent() {
      this._RegisterHandler('input.pressed', (m) => this.OnInput_(m));
      this._RegisterHandler('ui.toolChanged', (m) => this.OnToolChanged_(m));
    }

    OnToolChanged_(msg) {
      if (!hack_defs.showTools) {
        return;
      }

      if (msg.value != 'break') {
        this.LoseFocus();
      } else {
        this.GainFocus();
      }
    }

    LoseFocus() {
      this.balls_.visible = false;
      this.placementMesh_.visible = false;
      this.active_ = false;
    }

    GainFocus() {
      this.balls_.visible = true;
      this.placementMesh_.visible = true;
      this.active_ = true;
    }

    LoadModel_() {
      const scene = this.FindEntity('renderer').GetComponent('ThreeJSController').scene_;
      const camera = this.FindEntity('renderer').GetComponent('ThreeJSController').uiCamera_;

      this.balls_ = new THREE.Group();
      camera.add(this.balls_);

      const loader = new GLTFLoader();
      loader.load('./resources/pickaxe/scene.gltf', (gltf) => {
        gltf.scene.traverse(c => {
          if (c.material) {
            c.material.depthWrite = false;
            c.material.depthTest = false;
          }
        });

        this.mesh_ = gltf.scene;
        this.mesh_.position.set(2, 2, 1);
        this.mesh_.scale.setScalar(0.1);
        this.mesh_.rotateZ(0.25 * 2 * Math.PI);
        this.mesh_.rotateY(-0.1 * 2 * Math.PI);

        this.group_ = new THREE.Group();
        this.group_.add(this.mesh_);
        this.group_.position.set(0, -3, -4);
        const endRot = this.group_.quaternion.clone();
        this.group_.rotateX(-0.25 * 2 * Math.PI);
        const startRot = this.group_.quaternion.clone();
        this.group_.quaternion.identity();

        this.balls_.add(this.group_);
  
        const rotFrames = new THREE.QuaternionKeyframeTrack(
            '.quaternion',
            [0, 1, 2],
            [...endRot.toArray(), ...startRot.toArray(), ...endRot.toArray()]);
        
        const rotClip = new THREE.AnimationClip('rot', -1, [rotFrames]);
  
        this.mixer_ = new THREE.AnimationMixer(this.group_);
        this.action_ = this.mixer_.clipAction(rotClip);
      });

      const geo = new THREE.BoxBufferGeometry(1, 1, 1);

      const p1 = new THREE.ShaderMaterial({
          uniforms: {
              time: {value: 0.0},
              edgeColour: { value: new THREE.Color(0xFF0000) },
          },
          vertexShader: voxel_shader.PLACEMENT.VS,
          fragmentShader: voxel_shader.PLACEMENT.PS,
          side: THREE.FrontSide,
          blending: THREE.NormalBlending,
          transparent: true,
          depthWrite: false,
      });
      const p2 = p1.clone();
      p2.side = THREE.BackSide;

      const m1 = new THREE.Mesh(geo, p1);
      const m2 = new THREE.Mesh(geo, p2);
      m1.renderOrder = 1;
      this.placementMesh_ = new THREE.Group();
      this.placementMesh_.add(m1);
      this.placementMesh_.add(m2);
      this.placementMesh_.scale.setScalar(1.0001);
      this.material1_ = p1;
      this.material2_ = p2;

      scene.add(this.placementMesh_);

      this.LoseFocus();
    }

    OnInput_(msg) {
      if (!this.active_) {
        return;
      }

      if (msg.value == 'enter') {
        this.PerformAction();
      }
    }

    PerformAction() {
      if (!this.active_) {
        return;
      }

      if (!this.placementMesh_.visible) {
        return;
      }

      const voxels = this.FindEntity('voxels').GetComponent('SparseVoxelCellManager');
      const possibleCoords = [
          this.placementMesh_.position.x, this.placementMesh_.position.y, this.placementMesh_.position.z];

      if (voxels.HasVoxelAt(...possibleCoords)) {
        voxels.RemoveVoxelAt(possibleCoords);

        if (this.action_) {
          this.action_.setLoop(THREE.LoopOnce, 1);
          this.action_.clampWhenFinished = true;
          this.action_.timeScale = 10.0;
          this.action_.reset();
          this.action_.play();  
        }
      }
    }

    Update(timeInSeconds) {
      if (!this.active_) {
        return;
      }

      if (this.mixer_) {
        this.mixer_.update(timeInSeconds);
      }

      this.timer_ += timeInSeconds;
      this.material1_.uniforms.time.value = this.timer_;
      this.material2_.uniforms.time.value = this.timer_;
      this.material1_.needsUpdate = true;
      this.material2_.needsUpdate = true;

      // HACK
      const voxels = this.FindEntity('voxels').GetComponent('SparseVoxelCellManager');

      const player = this.FindEntity('player');
      const forward = new THREE.Vector3(0, 0, -1);
      forward.applyQuaternion(player.Quaternion);

      const ray = new THREE.Ray(player.Position, forward);
      const intersections = voxels.FindIntersectionsWithRay(ray, 4);
      if (!intersections.length) {
        return;
      }

      const possibleCoords = [...intersections[0].voxel.position];

      if (voxels.HasVoxelAt(...possibleCoords)) {
        this.placementMesh_.position.set(...possibleCoords);
        this.placementMesh_.visible = true;
      }
    }
  };

  return {
      VoxelTools_Insert: VoxelTools_Insert,
      VoxelTools_Delete: VoxelTools_Delete,
  };
})();