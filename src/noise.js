import {simplex} from './simplex-noise.js';


export const noise = (function() {

  class _NoiseGenerator {
    constructor(params) {
      this.params_ = params;
      this._Init();
    }

    _Init() {
      this._noise = new simplex.SimplexNoise(this.params_.seed);
    }

    Get(x, y, z) {
      const G = 2.0 ** (-this.params_.persistence);
      const xs = x / this.params_.scale;
      const ys = y / this.params_.scale;
      const zs = z / this.params_.scale;
      const noiseFunc = this._noise;

      let amplitude = 1.0;
      let frequency = 1.0;
      let normalization = 0;
      let total = 0;
      for (let o = 0; o < this.params_.octaves; o++) {
        let noiseValue = noiseFunc.noise3D(
          xs * frequency, ys * frequency, zs * frequency);

        total += noiseValue * amplitude;
        normalization += amplitude;
        amplitude *= G;
        frequency *= this.params_.lacunarity;
      }
      total /= normalization;

      if (this.params_.ridged) {
        total = 1.0 - Math.abs(total);
      } else {
        total = total * 0.5 + 0.5;
      }

      total = Math.pow(
          total, this.params_.exponentiation);

      if (this.params_.range) {
        const range = this.params_.range;
        total = range[0] + (range[1] - range[0]) * total;
      }
    
      return total * this.params_.height;
    }
  }

  return {
    Noise: _NoiseGenerator
  }
})();
