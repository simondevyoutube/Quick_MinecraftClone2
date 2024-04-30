import * as THREE from 'three';

import {threejs_component} from './threejs-component.js';
import {sparse_voxel_cell_manager} from './sparse-voxel-cell-manager.js';

import {entity_manager} from './entity-manager.js';
import {entity} from './entity.js';
import {cloud_controller} from './cloud-controller.js';
import {player_controller} from './player-controller.js';
import {voxel_tools} from './voxel-tools.js';
import {hack_defs}  from './hack-defs.js';
import {ui_controller} from './ui-controller.js';
import {defs} from './defs.js';


class LessCrappyMinecraftAttempt {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this.entityManager_ = new entity_manager.EntityManager();

    this.LoadControllers_();

    this.previousRAF_ = null;
    this.RAF_();
  }

  CreateGUI_() {
    this._guiParams = {
      general: {
      },
    };
    this._gui = new GUI();
    this._gui.close();
  }

  LoadControllers_() {
    const threejs = new entity.Entity();
    threejs.AddComponent(new threejs_component.ThreeJSController());
    this.entityManager_.Add(threejs, 'renderer');

    // Hack
    this.renderer_ = threejs.GetComponent('ThreeJSController');
    this.scene_ = threejs.GetComponent('ThreeJSController').scene_;
    this.camera_ = threejs.GetComponent('ThreeJSController').camera_;
    this.threejs_ = threejs.GetComponent('ThreeJSController').threejs_;
    
    const voxelManager = new entity.Entity();
    voxelManager.AddComponent(new sparse_voxel_cell_manager.SparseVoxelCellManager({
        cellSize: hack_defs.WORLD_BLOCK_SIZE,
        worldSize: hack_defs.WORLD_SIZE,
    }));
    this.entityManager_.Add(voxelManager, 'voxels');

    const clouds = new entity.Entity();
    clouds.AddComponent(new cloud_controller.CloudController());
    this.entityManager_.Add(clouds);

    const player = new entity.Entity();
    player.AddComponent(new player_controller.PlayerController());
    player.AddComponent(new voxel_tools.VoxelTools_Insert());
    player.AddComponent(new voxel_tools.VoxelTools_Delete());
    player.SetPosition(new THREE.Vector3(...defs.PLAYER_POS));
    player.SetQuaternion(new THREE.Quaternion(...defs.PLAYER_ROT));

    this.entityManager_.Add(player, 'player');

    const ui = new entity.Entity();
    ui.AddComponent(new ui_controller.UIController());
    this.entityManager_.Add(ui, 'ui');
  }

  RAF_() {
    requestAnimationFrame((t) => {
      if (this.previousRAF_ === null) {
        this.previousRAF_ = t;
      }

      this.Step_(t - this.previousRAF_);
      this.renderer_.Render();
      this.previousRAF_ = t;

      setTimeout(() => {
        this.RAF_();
      }, 1);
    });
  }

  Step_(timeElapsed) {
    const timeElapsedS = Math.min(1.0 / 30.0, timeElapsed * 0.001);

    this.entityManager_.Update(timeElapsedS);
  }
}


let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new LessCrappyMinecraftAttempt();
});