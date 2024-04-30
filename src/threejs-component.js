import * as THREE from 'three';

import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass.js';

import {GammaCorrectionShader} from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
import {FXAAShader} from 'three/examples/jsm/shaders/FXAAShader.js';

import {entity} from "./entity.js";
import {hack_defs} from "./hack-defs.js";
import {defs} from "./defs.js";


export const threejs_component = (() => {

  const _VS = `
  varying vec3 vWorldPosition;
  
  void main() {
    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
    vWorldPosition = worldPosition.xyz;
  
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }`;
  
  
  const _FS = `
  uniform vec3 topColor;
  uniform vec3 bottomColor;
  uniform vec3 playerPos;
  uniform float offset;
  uniform float exponent;
  uniform float whiteBlend;
  uniform float time;
  uniform samplerCube background;
  
  varying vec3 vWorldPosition;
  
  float sdPlane(vec3 p, vec3 n, float h) {
    // n must be normalized
    return dot(p, n) + h;
  }

  void main() {
    vec3 viewDirection = normalize(vWorldPosition - cameraPosition);
    vec3 stars = sRGBToLinear(textureCube(background, viewDirection)).xyz;
 
    float h = normalize(vWorldPosition + offset).y;
    float t = max(pow(max(h, 0.0), exponent), 0.0);
  
    float f = exp(min(0.0, -vWorldPosition.y * 0.0125));
  
    float heightMix = clamp((playerPos.y - 500.0) / 1000.0, 0.0, 1.0);
    heightMix = smoothstep(0.0, 1.0, heightMix);
    heightMix = smoothstep(0.0, 1.0, heightMix);

    float wrapFactor = playerPos.y / 500.0;
    float normalMix = clamp((viewDirection.y + wrapFactor) / (1.0 + wrapFactor), 0.0, 1.0);
    normalMix = pow(normalMix, 0.250);

    vec3 topMix = mix(topColor, stars, heightMix * normalMix);

    // Normal
    vec3 sky = mix(topMix, bottomColor, f);
    // Moon
    // vec3 sky = mix(stars, bottomColor, f);
    float skyMix = clamp(whiteBlend, 0.0, 1.0);
    sky = mix(bottomColor, sky, skyMix * skyMix);
    gl_FragColor = vec4(sky, 1.0);
    // gl_FragColor = vec4(vec3(normalMix * normalMix), 1.0);
  }`;

  class ThreeJSController extends entity.Component {
    static CLASS_NAME = 'ThreeJSController';

    get NAME() {
      return ThreeJSController.CLASS_NAME;
    }

    constructor() {
      super();
    }

    InitEntity() {
      this.threejs_ = new THREE.WebGLRenderer({
        antialias: false,
      });

      this.threejs_.shadowMap.enabled = true;
      this.threejs_.shadowMap.type = THREE.PCFSoftShadowMap;
      this.threejs_.setPixelRatio(window.devicePixelRatio);
      this.threejs_.setSize(window.innerWidth, window.innerHeight);
      this.threejs_.domElement.id = 'threejs';
  
      document.getElementById('container').appendChild(this.threejs_.domElement);
  
      window.addEventListener('resize', () => {
        this.OnResize_();
      }, false);
  
      const fov = 60;
      const aspect = 1920 / 1080;
      const near = 0.5;
      const far = 10000.0;
      this.camera_ = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this.camera_.position.set(15, 50, 15);
      this.camera_.lookAt(0, 0, 0);
  
      this.uiCamera_ = new THREE.PerspectiveCamera(fov, aspect, near, far);

      this.scene_ = new THREE.Scene();
      this.scene_.add(this.camera_);

      this.uiScene_ = new THREE.Scene();
      this.uiScene_.add(this.uiCamera_);
  
      let light = new THREE.DirectionalLight(0x8088b3, 0.7);
      light.position.set(-10, 500, 10);
      light.target.position.set(0, 0, 0);
      this.scene_.add(light);
      this.uiScene_.add(light.clone());
      
      this.sun_ = light;

      const params = {
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          format: THREE.RGBAFormat,
          type: THREE.FloatType,
      };

      const hdr = new THREE.WebGLRenderTarget(
          window.innerWidth, window.innerHeight, params);
      hdr.stencilBuffer = false;
      hdr.depthBuffer = true;
      hdr.depthTexture = new THREE.DepthTexture();
      hdr.depthTexture.format = THREE.DepthFormat;
      hdr.depthTexture.type = THREE.UnsignedIntType;

      this.fxaa_ = new ShaderPass(FXAAShader);

      const uiPass = new RenderPass(this.uiScene_, this.uiCamera_);
      uiPass.clear = false;

      this.composer_ = new EffectComposer(this.threejs_, hdr);
      this.composer_.addPass(new RenderPass(this.scene_, this.camera_));
      this.composer_.addPass(uiPass);
      this.composer_.addPass(this.fxaa_);
      this.composer_.addPass(new ShaderPass(GammaCorrectionShader));

      // So dumb. Don't judge me.
      const m1 = new THREE.Mesh(
          new THREE.BoxBufferGeometry(0.1, 0.01, 0.01),
          new THREE.MeshBasicMaterial({
              color: new THREE.Color(0xFFFFFF),
              depthWrite: false,
              depthTest: false,
          }));
      m1.position.set(0, 0, -2);
      const m2 = new THREE.Mesh(
          new THREE.BoxBufferGeometry(0.01, 0.1, 0.01),
          new THREE.MeshBasicMaterial({
              color: new THREE.Color(0xFFFFFF),
              depthWrite: false,
              depthTest: false,
          }));
      m2.position.set(0, 0, -2);
      this.uiCamera_.add(m1);
      this.uiCamera_.add(m2);

      if (!hack_defs.showTools) {
        m1.visible = false;
        m2.visible = false;
      }

      // const controls = new OrbitControls(
      //   this.camera_, this.threejs_.domElement);
      // controls.target.set(2, 0, 2);
      // controls.update();

      this.LoadSky_();
      this.OnResize_();
    }

    OnResize_() {
      this.camera_.aspect = window.innerWidth / window.innerHeight;
      this.camera_.updateProjectionMatrix();
      this.threejs_.setSize(window.innerWidth, window.innerHeight);
      this.composer_.setSize(window.innerWidth, window.innerHeight);

      const pixelRatio = this.threejs_.getPixelRatio();

      this.fxaa_.material.uniforms[ 'resolution' ].value.x = 1 / ( window.innerWidth * pixelRatio );
      this.fxaa_.material.uniforms[ 'resolution' ].value.y = 1 / ( window.innerHeight * pixelRatio );
    }

    LoadSky_() {
      const hemiLight = new THREE.HemisphereLight(0x424a75, 0xFFFFFF, 0.9);
      this.scene_.add(hemiLight);
      this.uiScene_.add(hemiLight.clone());
  
  
      const loader = new THREE.CubeTextureLoader();
      const texture = loader.load([
          './resources/terrain/space-posx.jpg',
          './resources/terrain/space-negx.jpg',
          './resources/terrain/space-posy.jpg',
          './resources/terrain/space-negy.jpg',
          './resources/terrain/space-posz.jpg',
          './resources/terrain/space-negz.jpg',
      ]);
      texture.encoding = THREE.sRGBEncoding;
  
      const uniforms = {
        "topColor": { value: defs.SKY_COLOUR.clone() },
        "bottomColor": { value: defs.FOG_COLOUR.clone() },
        "offset": { value: 0 },
        "exponent": { value: 0.6 },
        "background": { value: texture },
        "whiteBlend": { value: 0.0 },
        "playerPos": { value: new THREE.Vector3() },
        time: {
          value: 0.0,
        },
      };
      // uniforms["topColor"].value.copy(hemiLight.color);
  
      const skyGeo = new THREE.SphereBufferGeometry(5000, 32, 15);
      const skyMat = new THREE.ShaderMaterial({
          uniforms: uniforms,
          vertexShader: _VS,
          fragmentShader: _FS,
          side: THREE.BackSide,
      });
  
      const sky = new THREE.Mesh(skyGeo, skyMat);
      this.sky_ = sky;
      this.scene_.add(sky);
    }

    Update(timeElapsed) {
      const player = this.FindEntity('player');
      if (!player) {
        return;
      }
      const pos = player._position;
  
      const forward = new THREE.Vector3(0, 0, -1);
      forward.applyQuaternion(player.Quaternion);
      forward.multiplyScalar(750);

      this.sun_.position.copy(pos);
      this.sun_.position.add(new THREE.Vector3(-50, 200, -10));
      this.sun_.target.position.copy(pos);
      this.sun_.updateMatrixWorld();
      this.sun_.target.updateMatrixWorld();

      this.sky_.position.copy(new THREE.Vector3(pos.x, 0, pos.z));
      this.sky_.material.uniforms.playerPos.value.copy(pos);
      this.sky_.material.uniforms.time.value += timeElapsed;
      this.sky_.material.needsUpdate = true;
    }

    Render() {
      this.uiCamera_.position.copy(this.camera_.position);
      this.uiCamera_.quaternion.copy(this.camera_.quaternion);

      this.composer_.render();
      // this.threejs_.render(this.scene_, this.camera_);
    }
  }

  return {
      ThreeJSController: ThreeJSController,
  };
})();