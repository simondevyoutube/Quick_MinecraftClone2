

export const hack_defs = (() => {

  const _INTRO = {
    enabled: false,
    foliageEnabled: false,
    introEnabled: false,
    oceanEnabled: false,
    hardcodedFoliageEnabled: true,
    PLAYER_POS: [-1826.1306923527645, 27.940844444445403, -220.6986696117536],
    PLAYER_ROT: [-0.0380279893805328, 0.3364980691628503, 0.013601301436886065, 0.9408176901358577],
    CAMERA_POS: [-2150, -557],
    CAMERA_DECCELERATION: [-10, 0, -10],
    INTRO_RATE: 0.0005,
    WORLD_SIZE: 24
  };

  return {
    enabled: false,
    foliageEnabled: true,
    hardcodedFoliageEnabled: false,
    introEnabled: false,
    skipOceans: false,
    skipClouds: false,
    skipFoliageNoise: false,
    skipPruning: false,
    skipExteriorBlocks: false,
    skipAO: false,
    skipVariableLuminance: false,
    skipGravity: false,
    useFlatTerrain: false,
    showTools: true,
    fixedTerrainOrigin: false,
    PLAYER_POS: [-1826.1306923527645, 27.940844444445403, -220.6986696117536],
    PLAYER_ROT: [-0.0380279893805328, 0.3364980691628503, 0.013601301436886065, 0.9408176901358577],
    CAMERA_POS: [0, 0],
    CAMERA_DECCELERATION: [-10, 0, -10],
    INTRO_RATE: 0.0005,
    WORLD_BLOCK_SIZE: 16,
    WORLD_SIZE: 24
  };

})();