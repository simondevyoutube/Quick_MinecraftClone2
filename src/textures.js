import * as THREE from 'three';


export const textures = (() => {

  // Taken from https://github.com/mrdoob/three.js/issues/758
  function _GetImageData( image ) {
    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;

    var context = canvas.getContext('2d');
    context.drawImage( image, 0, 0 );

    return context.getImageData( 0, 0, image.width, image.height );
  }

class TextureAtlas {
    constructor() {
      this.Create_();
      this.onLoad = () => {};
    }

    Load(atlas, names) {
      this.LoadAtlas_(atlas, names);
    }

    Create_() {
      this.manager_ = new THREE.LoadingManager();
      this.loader_ = new THREE.TextureLoader(this.manager_);
      this.textures_ = {};

      this.manager_.onLoad = () => {
        this.OnLoad_();
      };
    }

    get Info() {
      return this.textures_;
    }

    LoadTexture_(n) {
      const t = this.loader_.load(n);
      t.encoding = THREE.sRGBEncoding;
      return t;
    }
    
    OnLoad_() {
      for (let k in this.textures_) {
        const atlas = this.textures_[k];
        const data = new Uint8Array(atlas.textures.length * 4 * 16 * 16);

        for (let t = 0; t < atlas.textures.length; t++) {
          const curTexture = atlas.textures[t];
          const curData = _GetImageData(curTexture.image);
          const offset = t * (4 * 16 * 16);

          data.set(curData.data, offset);
        }
  
        const diffuse = new THREE.DataTexture2DArray(data, 16, 16, atlas.textures.length);
        diffuse.format = THREE.RGBAFormat;
        diffuse.type = THREE.UnsignedByteType;
        diffuse.minFilter = THREE.LinearMipMapLinearFilter;
        diffuse.magFilter = THREE.NearestFilter;
        diffuse.wrapS = THREE.ClampToEdgeWrapping;
        diffuse.wrapT = THREE.ClampToEdgeWrapping;
        diffuse.generateMipmaps = true;
        diffuse.encoding = THREE.sRGBEncoding;

        atlas.atlas = diffuse;
      }

      this.onLoad();
    }

    LoadAtlas_(atlas, names) {
      this.textures_[atlas] = {
        textures: names.map(n => this.LoadTexture_(n) ),
        atlas: null,
      };
    }
  };

  return {
      TextureAtlas: TextureAtlas,
  };
})();
