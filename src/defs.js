import * as THREE from 'three';


export const defs = (() => {

  return {
      FOG_RANGE: [100, 300],
      UNDERWATER_RANGE: [0, 50],
      FOG_COLOUR: new THREE.Color(0xcddef1).convertSRGBToLinear(),
      MOON_COLOUR: new THREE.Color(0x808080).convertSRGBToLinear(),
      UNDERWATER_COLOUR: new THREE.Color(0x3a6fb5).convertSRGBToLinear(),
      SKY_COLOUR: new THREE.Color(0x7cbff6).convertSRGBToLinear(),
      PLAYER_POS: [255.311252087425, 100, 290.98564212457086],
      PLAYER_ROT: [0.02753162419089479, -0.7573631733845853, 0.031998988835540886, 0.6516280365237096],
  };
})();