import * as THREE from 'three';
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls.js';
import {entity} from './entity.js';

import {hack_defs} from './hack-defs.js';


export const player_controller = (() => {

  // FPSControls was adapted heavily from a threejs example. Movement control
  // and collision detection was completely rewritten, but credit to original
  // class for the setup code.
  class PlayerController extends entity.Component {
    static CLASS_NAME = 'PlayerController';

    get NAME() {
      return PlayerController.CLASS_NAME;
    }

    constructor() {
      super();
    }

    InitEntity() {
      this.radius_ = 1.5;
      this.keys_ = {
        forward: false,
        backward: false,
        left: false,
        right: false,
      };
      this.standing = true;
      this.velocity_ = new THREE.Vector3(0, 0, 0);
      this.decceleration_ = new THREE.Vector3(-10, -9.8 * 5, -10);
      this.acceleration_ = new THREE.Vector3(75, 20, 75);

      // this.decceleration_ = new THREE.Vector3(-10, -9.8 * 2, -10);
      this.acceleration_ = new THREE.Vector3(200, 25, 200);

      const threejs = this.FindEntity('renderer').GetComponent('ThreeJSController');
      this.element_ = threejs.threejs_.domElement;
      this.camera_ = threejs.camera_;

      this.SetupPointerLock_();

      this.controls_ = new PointerLockControls(this.camera_, document.body);
      threejs.scene_.add(this.controls_.getObject());

      // HACK
      if (hack_defs.enabled) {
        this.controls_.getObject().position.set(...hack_defs.PLAYER_POS);
        this.controls_.getObject().quaternion.set(...hack_defs.PLAYER_ROT);
        this.decceleration_ = new THREE.Vector3(...hack_defs.CAMERA_DECCELERATION);
      }

      this.controls_.getObject().position.copy(this.Parent.Position);

      document.addEventListener('keydown', (e) => this.OnKeyDown_(e), false);
      document.addEventListener('keyup', (e) => this.OnKeyUp_(e), false);
      // document.addEventListener('mouseup', (e) => this._onMouseUp(e), false);
    }

    OnKeyDown_(event) {
      switch (event.keyCode) {
        case 38: // up
        case 87: // w
          this.keys_.forward = true;
          break;
        case 37: // left
        case 65: // a
          this.keys_.left = true;
          break;
        case 40: // down
        case 83: // s
          this.keys_.backward = true;
          break;
        case 39: // right
        case 68: // d
          this.keys_.right = true;
          break;
        case 32: // space
          if (this.standing) {
            this.velocity_.y = this.acceleration_.y;
            this.standing = false;
          }
          break;
      }
    }

    OnKeyUp_(event) {
      switch(event.keyCode) {
        case 38: // up
        case 87: // w
          this.keys_.forward = false;
          break;
        case 37: // left
        case 65: // a
          this.keys_.left = false;
          break;
        case 40: // down
        case 83: // s
          this.keys_.backward = false;
          break;
        case 39: // right
        case 68: // d
          this.keys_.right = false;
          break;
        case 79: // o
          // this.OnCycleTextures_(-1);
          break;
        case 80: // p
          // this.OnCycleTextures_(1);
          break;
        case 84: // t
          this.OnCycleTools_();
          break;
        case 219: // [
          this.OnCycleTextures_(-1);
          break;
        case 221: // 
          this.OnCycleTextures_(1);
          break;
        // case 33: // PG_UP
        //   this.cells_.ChangeActiveTool(1);
        //   break;
        // case 34: // PG_DOWN
        // this.cells_.ChangeActiveTool(-1);
        //   break;
        case 13: // enter
          this.keys_.enter = true;
          break;
      }
    }

    _onMouseUp(event) {
      this.keys_.enter = true;
    }

    SetupPointerLock_() {
      const hasPointerLock = (
          'pointerLockElement' in document ||
          'mozPointerLockElement' in document ||
          'webkitPointerLockElement' in document);
      if (hasPointerLock) {
        const lockChange = (event) => {
          if (document.pointerLockElement === document.body ||
              document.mozPointerLockElement === document.body ||
              document.webkitPointerLockElement === document.body ) {
            this.enabled_ = true;
            this.controls_.enabled = true;
          } else {
            this.controls_.enabled = false;
          }
        };
        const lockError = (event) => {
          console.log(event);
        };

        document.addEventListener('pointerlockchange', lockChange, false);
        document.addEventListener('webkitpointerlockchange', lockChange, false);
        document.addEventListener('mozpointerlockchange', lockChange, false);
        document.addEventListener('pointerlockerror', lockError, false);
        document.addEventListener('mozpointerlockerror', lockError, false);
        document.addEventListener('webkitpointerlockerror', lockError, false);

        this.element_.addEventListener('click', (event) => {
          document.body.requestPointerLock = (
              document.body.requestPointerLock ||
              document.body.mozRequestPointerLock ||
              document.body.webkitRequestPointerLock);

          if (/Firefox/i.test(navigator.userAgent)) {
            const fullScreenChange = (event) => {
              if (document.fullscreenElement === document.body ||
                  document.mozFullscreenElement === document.body ||
                  document.mozFullScreenElement === document.body) {
                document.removeEventListener('fullscreenchange', fullScreenChange);
                document.removeEventListener('mozfullscreenchange', fullScreenChange);
                document.body.requestPointerLock();
              }
            };
            document.addEventListener(
                'fullscreenchange', fullScreenChange, false);
            document.addEventListener(
                'mozfullscreenchange', fullScreenChange, false);
            document.body.requestFullscreen = (
                document.body.requestFullscreen ||
                document.body.mozRequestFullscreen ||
                document.body.mozRequestFullScreen ||
                document.body.webkitRequestFullscreen);
            document.body.requestFullscreen();
          } else {
            document.body.requestPointerLock();
          }
        }, false);
      }
    }

    _FindIntersections(boxes, position) {
      const sphere = new THREE.Sphere(position, this.radius_);

      const intersections = boxes.filter(b => {
        return sphere.intersectsBox(b);
      });

      return intersections;
    }

    OnCycleTools_() {
      const ui = this.FindEntity('ui').GetComponent('UIController');
      ui.CycleTool_();
    }

    OnCycleTextures_(dir) {
      const ui = this.FindEntity('ui').GetComponent('UIController');
      ui.CycleBuildIcon_(dir);
    }

    Update(timeInSeconds) {
      const controlObject = this.controls_.getObject();

      const demo = false;
      if (demo) {
        controlObject.position.x += timeInSeconds * 5;
        controlObject.position.z += timeInSeconds * 5;
        this.Parent.SetPosition(controlObject.position);
        this.Parent.Position.x += 220;
        this.Parent.Position.z += 220;
        return;
      }

      if (this.keys_.enter) {
        this.Broadcast({topic: 'input.pressed', value: 'enter'});
      }

      this.keys_.enter = false;

      const velocity = this.velocity_;
      const frameDecceleration = new THREE.Vector3(
          this.velocity_.x * this.decceleration_.x,
          this.decceleration_.y,
          this.velocity_.z * this.decceleration_.z
      );

      frameDecceleration.multiplyScalar(timeInSeconds);
      frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
          Math.abs(frameDecceleration.z), Math.abs(velocity.z));

      if (hack_defs.skipGravity) {
        frameDecceleration.y = Math.sign(frameDecceleration.y) * Math.min(
            Math.abs(frameDecceleration.y), Math.abs(velocity.y));
      }
      this.velocity_.add(frameDecceleration);

      // Gravity
      if (!hack_defs.skipGravity) {
        this.velocity_.y = Math.max(this.velocity_.y, -50);
      }


      if (this.keys_.forward) {
        this.velocity_.z -= this.acceleration_.z * timeInSeconds;
      }
      if (this.keys_.backward) {
        this.velocity_.z += this.acceleration_.z * timeInSeconds;
      }
      if (this.keys_.left) {
        this.velocity_.x -= this.acceleration_.x * timeInSeconds;
      }
      if (this.keys_.right) {
        this.velocity_.x += this.acceleration_.x * timeInSeconds;
      }

      const voxelManager = this.FindEntity('voxels').GetComponent('SparseVoxelCellManager');
      const voxelList = voxelManager.FindVoxelsNear(
          controlObject.position, 3).filter(v => v.type != 'ocean');

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
      const boxes = voxelList.map(v => AsAABB_(v));

      const oldPosition = new THREE.Vector3();
      oldPosition.copy(controlObject.position);

      const forward = new THREE.Vector3(0, 0, 1);
      forward.applyQuaternion(controlObject.quaternion);
      forward.y = 0;
      forward.normalize();

      const sideways = new THREE.Vector3(1, 0, 0);
      sideways.applyQuaternion(controlObject.quaternion);
      sideways.normalize();

      sideways.multiplyScalar(this.velocity_.x * timeInSeconds);
      forward.multiplyScalar(this.velocity_.z * timeInSeconds);

      const alreadyIntersecting = this._FindIntersections(
          boxes, controlObject.position).length > 0;

      controlObject.position.add(forward);
      controlObject.position.add(sideways);

      let intersections = this._FindIntersections(
          boxes, controlObject.position);
      if (intersections.length > 0 && !alreadyIntersecting) {
        controlObject.position.copy(oldPosition);
      }

      oldPosition.copy(controlObject.position);
      const _STEP_SIZE = 0.01;
      let timeAcc = _STEP_SIZE;
      while (timeAcc < timeInSeconds) {
        controlObject.position.y += this.velocity_.y * timeAcc;
        intersections = this._FindIntersections(boxes, controlObject.position);
        if (intersections.length > 0) {
          controlObject.position.copy(oldPosition);
  
          this.velocity_.y = Math.max(0, this.velocity_.y);
          this.standing = true;
          break;
        }  
        timeAcc = Math.min(timeAcc + _STEP_SIZE, timeInSeconds);
      }

      if (controlObject.position.y < -100) {
        this.velocity_.y = 0;
        controlObject.position.y = 250;
        this.standing = true;
      }

      this.Parent.SetPosition(controlObject.position);
      this.Parent.SetQuaternion(controlObject.quaternion);
    }
  };

  return {
      PlayerController: PlayerController,
  };
})();
