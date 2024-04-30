import * as THREE from 'three';

import {noise} from './noise.js';
import {math} from './math.js';
import {foliage_sdfs} from './foliage-sdfs.js';
import {hack_defs} from './hack-defs.js';


export const voxel_block_builder = (() => {

  const _VOXEL_HEIGHT = 128;
  const _OCEAN_LEVEL = Math.floor(_VOXEL_HEIGHT * 0.05);
  const _BEACH_LEVEL = _OCEAN_LEVEL + 4;
  const _SNOW_LEVEL = Math.floor(_VOXEL_HEIGHT * 0.7);
  const _MOUNTAIN_LEVEL = Math.floor(_VOXEL_HEIGHT * 0.3);

  const _OCEAN_C = new THREE.Color(0x8080FF);
  const _BEACH_C = new THREE.Color(0xFFFF80);
  const _SNOW_C = new THREE.Color(0xFFFFFF);
  const _STONE_C = new THREE.Color(0x404040);
  const _GRASS_C = new THREE.Color(0x40FF40);

  function Biome(e, m) {
    if (e < _OCEAN_LEVEL) return 'sand';
    if (e < _BEACH_LEVEL) return 'sand';

    if (e > _SNOW_LEVEL) {
      return 'snow';
    }

    if (e > _MOUNTAIN_LEVEL) {
      // if (m < 0.2) {
      //   return 'stone';
      // } else if (m < 0.25) {
      //   return 'grass';
      // }
    }
    return 'grass';
  }


  class TerrainGeneratorFlat {
    constructor() {
    }

    Get(x, z) {
      if (x == 0 && z == 0) {
        // return ['grass', 4097];
      }
      return ['grass', 0];
    }
  };

  const _N_Perlin = new noise.Noise({
    seed: 6,
    octaves: 1,
    scale: 128,
    persistence: 0.5,
    lacunarity: 2.0,
    exponentiation: 4,
    height: 32,
  });

  class TerrainGeneratorBasicPerlin {
    constructor(params) {
      this.params_ = params;
    }

    Get(x, y) {
      const height = _N_Perlin.Get(x, y, 0.0);
      
      const elevation =  Math.floor(height);
    
      if (elevation < _OCEAN_LEVEL + 2) {
        return ['sand', elevation];
      }
      return ['grass', elevation];
    }
  };


  function BiomeDemo(e, m, roll) {
    if (e < _OCEAN_LEVEL) return 'sand';
    if (e < _BEACH_LEVEL) return 'sand';

    if (e > _SNOW_LEVEL * roll) {
      return 'snow';
    }

    if (e > _MOUNTAIN_LEVEL * roll) {
      return 'stone';
    }

    // if (m < 0.1) {
    //   return 'sand';
    // }

    return 'grass';
  }

  const _TMP_V1 = new THREE.Vector3();


  class TerrainGeneratorDemo {
    constructor(params) {
      this.params_ = params;
      this.pos_ = new THREE.Vector3(-1943, 0, -419);

      this.N_Demo1_ = new noise.Noise({
        seed: 6,
        octaves: 5,
        scale: 1024,
        persistence: 0.5,
        lacunarity: 2.0,
        exponentiation: 4,
        height: 1,
      });
    
      this.N_Demo2_ = new noise.Noise({
        seed: 4,
        octaves: 10,
        scale: 4096,
        persistence: 0.5,
        lacunarity: 2.0,
        exponentiation: 7,
        height: 1,
        ridged: true,
      });
    
    
      this.N_Demo3_ = new noise.Noise({
        seed: 10,
        octaves: 3,
        scale: 32,
        persistence: 0.5,
        lacunarity: 2.0,
        exponentiation: 7,
        height: 1
      });
    }

    Get(x, y) {
      const normalizedHeight = this.N_Demo1_.Get(x, y, 0.0);
      const normalizedHeight2 = this.N_Demo2_.Get(x, y, 0.0);
      // const areaHeight = _N_Height.Get(x, y, 0);
      const areaHeight = 128;
      let variableHeight = areaHeight * normalizedHeight;
      let mountainHeight = 128 * normalizedHeight2;

      const p = _TMP_V1.set(x, 0, y);
      const d = p.distanceTo(this.pos_);

      const f3 = this.N_Demo3_.Get(x, 20, y) * 0.2 + 0.8;
    
      // Mix from mountains to rolling hills
      const f1 = math.sat((d - 50) / 25);
      const mixedHeight = math.lerp(f1 ** 0.25, mountainHeight, variableHeight);

      // Mix from that to flat ocean
      const f2 = math.sat((d - 200) / 200);
      const finalHeight = math.lerp(f2, mixedHeight, 0);
      
      const elevation =  Math.floor(finalHeight);
      const moisture = _N_Moisture.Get(x, y, 0.0);
    
      const roll = this.N_Demo3_.Get(x, 10, y) * 0.4 + 0.6;
    
      return [BiomeDemo(elevation, moisture, roll), elevation];
    }
  };


  class TerrainGeneratorMoon {
    constructor(params) {
      this.params_ = params;

      this.N_Moon_ = new noise.Noise({
        seed: 4,
        octaves: 5,
        scale: 1024,
        persistence: 0.5,
        lacunarity: 2.0,
        exponentiation: 4,
        height: 1,
      });

      this.N_Craters_ = new noise.Noise({
        seed: 7,
        octaves: 1,
        scale: 0.99,
        persistence: 0.5,
        lacunarity: 2.0,
        exponentiation: 1,
        height: 1,
      });
    

      this.InitCraters_();
    }

    InitCraters_() {
      // Hack, dimensions needs to be divisible by stride, good luck to anybody who
      // changes this.
      this.craters_ = [];
      for (let x = -this.params_.dimensions.x * 10; x <= this.params_.dimensions.x * 10; x+= 8) {
        for (let z = -this.params_.dimensions.z * 10; z <= this.params_.dimensions.z * 10; z+= 8) {
          const xPos = x + this.params_.offset.x;
          const zPos = z + this.params_.offset.z;

          const roll = this.N_Craters_.Get(xPos, 0.0, zPos);
          if (roll > 0.95) {
            const craterSize = Math.min(
                (this.N_Craters_.Get(xPos, 1.0, zPos) ** 4.0) * 100, 50.0) + 4.0;
            this.craters_.push([new THREE.Vector3(xPos, 0, zPos), craterSize]);
          }
        }
      }
      let a = 0;
    }

    Get(x, z) {
      const n1 = this.N_Moon_.Get(x, z, 10.0);
      const n2 = this.N_Moon_.Get(x, z, 20.0);
      const normalizedHeight = Math.round(this.N_Moon_.Get(x + n1, z + n2, 0.0) * 64);
    
      let totalHeight = normalizedHeight;
    
      for (let i = 0; i < this.craters_.length; ++i) {
        const pos = new THREE.Vector3(x, 0, z);
        const [crater, radius] = this.craters_[i];
        const d = crater.distanceTo(pos);
        const craterWidth = radius;
        if (d < craterWidth * 2) {
          // Just some random crap to make a crater-like thing
          const rimWidth = radius / 4;
          const rimStart = Math.abs(d - (craterWidth - rimWidth));
          const rimFactor = math.sat(rimStart / rimWidth);
          const rimHeightFactor = 1.0 - rimFactor ** 0.5;
          const rimHeight = radius / 10;
    
          const craterFactor = 1.0 - math.sat((d - (craterWidth - rimWidth * 2)) / rimWidth) ** 2;
    
          totalHeight += rimHeightFactor * rimHeight + craterFactor * -(rimHeight * 2.0);
        }
      }
      return ['moon', Math.round(totalHeight)];
    }
  };


  class TerrainGeneratorWorld {
    constructor(params) {
      this.params_ = params;

      this.moon_ = new TerrainGeneratorMoon(params);
      this.grass_ = new TerrainGeneratorGrass(params);
      this.sand_ = new TerrainGeneratorSand(params);
      this.rocky_ = new TerrainGeneratorRocky(params);
      
      this.N_Height_ = new noise.Noise({
          seed: 100,
          octaves: 1,
          scale: 4096,
          persistence: 0.5,
          lacunarity: 2.0,
          exponentiation: 1,
          height: 32,
      });
      this.N_Roll_ = new noise.Noise({
          seed: 200,
          octaves: 1,
          scale: 8,
          persistence: 0.5,
          lacunarity: 2.0,
          exponentiation: 1,
          height: 1,
      });
      this.N_ = new noise.Noise({
          seed: 4,
          octaves: 0.99,
          scale: 1,
          persistence: 0.5,
          lacunarity: 2.0,
          exponentiation: 1,
          height: 4,
      });
      this.N_Types_ = new noise.Noise({
          seed: 8,
          octaves: 0.99,
          scale: 1,
          persistence: 0.5,
          lacunarity: 2.0,
          exponentiation: 1,
          height: 4,
      });
    }

    Biome_(x, z, elevation, moisture) {
      const mp = math.smootherstep(moisture, 0, 1);
      const ep = math.smootherstep(elevation / 128.0, 0, 1);

      const m1e1 = ['sand', 0];
      const m1e2 = this.moon_.Get(x, z);
      const m2e1 = ['grass', 0];
      const m2e2 = ['stone', 0];

      const r1 = math.lerp(mp, m1e1[1], m2e1[1]);
      const r2 = math.lerp(mp, m1e2[1], m2e2[1]);
      const r3 = math.lerp(ep, r1, r2);

      const f1 = mp < 0.5 ? m1e1[0] : m2e1[0];
      const f2 = mp < 0.5 ? m1e2[0] : m2e2[0];
      const f3 = ep < 0.5 ? f1 : f2;

      return [f3, Math.floor(r3)];
    }

    Get2(x, z) {
      const height = this.N_Height_.Get(x, 0.0, z);
      const elevation =  Math.floor(height);
      const moisture = this.N_Moisture_.Get(x, 0.0, z);

      return this.Biome_(x, z, elevation, moisture);
    }

    ChooseTerrainType_(x, z) {
      const cellSize = 1024.0;
      const cellIndex = [Math.floor(x / cellSize), Math.floor(z / cellSize)];
      const cellPosition = [cellIndex[0] * cellSize, cellIndex[1] * cellSize];
      const cellCenter = [
          Math.round(this.N_.Get(cellIndex[0], 0.0, cellIndex[1]) * cellSize),
          Math.round(this.N_.Get(cellIndex[0], 1.0, cellIndex[1]) * cellSize)];

      cellCenter[0] = cellPosition[0] + cellSize * 0.5;
      cellCenter[1] = cellPosition[1] + cellSize * 0.5;

      const dist = ((x - cellCenter[0]) ** 2 + (z - cellCenter[1]) ** 2) ** 0.5;
      const falloff = math.sat((dist - cellSize * 0.25) / (cellSize * 0.25));

      const biomeType = Math.round(this.N_Types_.Get(cellIndex[0], 0.0, cellIndex[1]));

      let res = null;
      if (biomeType == 0) {
        res = this.rocky_.Get(x, z);
      } else if (biomeType == 1) {
        res = this.sand_.Get(x, z);
      } else if (biomeType == 2) {
        res = this.grass_.Get(x, z);
      } else if (biomeType == 3) {
        res = ['snow', 15];
      } else if (biomeType == 4) {
        res = this.moon_.Get(x, z);
      }

      res[1] = math.lerp(math.smootherstep(falloff, 0.0, 1.0), res[1], 0.0);
      const roll = this.N_Roll_.Get(x, 2.0, z);

      const typeFalloff = math.sat((dist - cellSize * 0.375) / (cellSize * 0.125));

      if (typeFalloff > roll) {
        res[0] = 'grass';
      }

      if (res[1] < _OCEAN_LEVEL) {
        res[0] = 'sand';
      }

      return res;
    }

    Get(x, z) {
      const result = this.ChooseTerrainType_(x, z);
      result[1] = Math.round(result[1]);
      return result;
    }
  };


  class TerrainGeneratorRocky {
    constructor(params) {
      this.params_ = params;

      this.N_Terrain_ = new noise.Noise({
          seed: 9,
          octaves: 6,
          scale: 500.005,
          persistence: 0.5,
          lacunarity: 2.0,
          exponentiation: 6,
          height: 64,
          ridged: true,
      });

      this.N_Roll_ = new noise.Noise({
          seed: 200,
          octaves: 2,
          scale: 8,
          persistence: 0.5,
          lacunarity: 2.0,
          exponentiation: 1,
          height: 1,
      });

      this.N_Height_ = new noise.Noise({
          seed: 100,
          octaves: 1,
          scale: 64,
          persistence: 0.5,
          lacunarity: 2.0,
          exponentiation: 1,
          height: 1,
          range: [0.25, 1],
      });
    }

    Get(x, z) {
      const height = this.N_Terrain_.Get(x, 0.0, z) * this.N_Height_.Get(x, 0, z);

      const elevation =  Math.floor(height);
      const roll = this.N_Roll_.Get(x, 0.0, z);

      const heightFactor = (elevation / 32.0);
      let type = 'stone';
      if (roll > heightFactor) {
        type = 'dirt';
      }

      return [type, elevation];
    }
  };


  class TerrainGeneratorSand {
    constructor(params) {
      this.params_ = params;

      this.N_Terrain_ = new noise.Noise({
          seed: 4,
          octaves: 4,
          scale: 500.005,
          persistence: 0.5,
          lacunarity: 2.0,
          exponentiation: 6,
          height: 1,
          range: [-1, 1],
      });

      this.N_Height_ = new noise.Noise({
          seed: 4,
          octaves: 3,
          scale: 500.005,
          persistence: 0.5,
          lacunarity: 2.0,
          exponentiation: 1,
          height: 64,
      });
    }

    Get(x, z) {
      const n1 = [this.N_Terrain_.Get(x, 0.0, z), this.N_Terrain_.Get(x, 1.0, z)];
      const height = this.N_Height_.Get(x + n1[0], 0.0, z + n1[1]);

      const elevation =  Math.floor(height);
    
      return ['sand', elevation];
    }
  };


  class TerrainGeneratorGrass {
    constructor(params) {
      this.params_ = params;

      this.N_Terrain_ = new noise.Noise({
          seed: 4,
          octaves: 6,
          scale: 4096,
          persistence: 0.5,
          lacunarity: 2.0,
          exponentiation: 6,
          height: 1,
      });

      this.N_Height_ = new noise.Noise({
          seed: 4,
          octaves: 3,
          scale: 4096,
          persistence: 0.5,
          lacunarity: 2.0,
          exponentiation: 1,
          height: 512,
      });
    
      this.N_Plateaus_ = new noise.Noise({
          seed: 5,
          octaves: 4,
          scale: 512,
          persistence: 0.5,
          lacunarity: 2.0,
          exponentiation: 2,
          height: 1,
      });
    
      this.N_PlateausNum_ = new noise.Noise({
          seed: 6,
          octaves: 4,
          scale: 1024,
          persistence: 0.5,
          lacunarity: 2.0,
          exponentiation: 1,
          height: 20,
      });

      this.N_Moisture_ = new noise.Noise({
          seed: 3,
          octaves: 3,
          scale: 512,
          persistence: 0.5,
          lacunarity: 2.0,
          exponentiation: 4,
          height: 1,
      });
    }

    Get(x, y) {
      const normalizedHeight = this.N_Terrain_.Get(x, y, 0.0);
      const areaHeight = this.N_Height_.Get(x, y, 0);
      let variableHeight = areaHeight * normalizedHeight;
      if (this.N_Plateaus_.Get(x, y, 0.0) > 0.25) {
        const numPlateaus = Math.round(10 + this.N_PlateausNum_.Get(x, y, 0));
        const plateauHeight = Math.round(areaHeight / numPlateaus);
        variableHeight = Math.round(variableHeight / plateauHeight) * plateauHeight;
      }
    
      const elevation =  Math.floor(variableHeight);
      const moisture = this.N_Moisture_.Get(x, y, 0.0);
    
      return [Biome(elevation, moisture), elevation];
    }
  };


  // HACKY TODO: Pass a terrain generation object through instead of these
  // loose functions.

  const _N_Luminance = new noise.Noise({
    seed: 10,
    octaves: 1,
    scale: 0.99,
    persistence: 0.5,
    lacunarity: 2.0,
    exponentiation: 4,
    height: 1
  });


  const _N_FadeIn = new noise.Noise({
    seed: 11,
    octaves: 4,
    scale: 2.01,
    persistence: 0.5,
    lacunarity: 2.0,
    exponentiation: 1,
    height: 1,
  });


  // Using a straight scale of 1.0 seems to produce bad values when using
  // integer inputs.
  const _N_Foliage = new noise.Noise({
    seed: 7,
    octaves: 1,
    scale: 0.99,
    persistence: 0.5,
    lacunarity: 2.0,
    exponentiation: 1,
    height: 1,
  });



  class SDFList {
    constructor() {
      this.sdfs_ = [];
    }

    Add(sdf) {
      this.sdfs_.push(sdf);
    }

    Intersects(aabb) {
      for (let i = 0; i < this.sdfs_.length; ++i) {
        const s = this.sdfs_[i];
        if (s.AABB.intersectsBox(aabb)) {
          return true;
        }
      }
      return false;
    }

    Evaluate(x, y, z) {
      const pos = new THREE.Vector3(x, y, z);

      for (let i = 0; i < this.sdfs_.length; ++i) {
        const s = this.sdfs_[i];
        if (s.AABB.containsPoint(pos)) {
          const res = s.Evaluate(pos);
          if (res) {
            return res;
          }
        }
      }
    }
  };


  class _VoxelBuilderThreadedWorker {
    constructor() {
      this.Create_();
    }

    Create_() {
      const pxGeometry = new THREE.PlaneBufferGeometry(1, 1);
      pxGeometry.rotateY(Math.PI / 2);
      pxGeometry.translate(0.5, 0, 0);

      const nxGeometry = new THREE.PlaneBufferGeometry(1, 1);
      nxGeometry.rotateY(-Math.PI / 2);
      nxGeometry.translate(-0.5, 0, 0);

      const pyGeometry = new THREE.PlaneBufferGeometry(1, 1);
      pyGeometry.rotateX(-Math.PI / 2);
      pyGeometry.translate(0, 0.5, 0);

      const nyGeometry = new THREE.PlaneBufferGeometry(1, 1);
      nyGeometry.rotateX(Math.PI / 2);
      nyGeometry.translate(0, -0.5, 0);

      const pzGeometry = new THREE.PlaneBufferGeometry(1, 1);
      pzGeometry.translate(0, 0, 0.5);

      const nzGeometry = new THREE.PlaneBufferGeometry(1, 1);
      nzGeometry.rotateY( Math.PI );
      nzGeometry.translate(0, 0, -0.5);

      const invertUvs = [pxGeometry, nxGeometry, pzGeometry, nzGeometry];
      for (let geo of invertUvs) {
        for (let i = 0; i < geo.attributes.uv.array.length; i+=2) {
          geo.attributes.uv.array[i + 1] = 1.0 - geo.attributes.uv.array[i + 1];
        }
      }

      this.geometries_ = [
          pxGeometry, nxGeometry,
          pyGeometry, nyGeometry,
          pzGeometry, nzGeometry
      ];
    }

    Init(params) {
      this.params_ = params;
      this.params_.offset = new THREE.Vector3(...params.offset);
      this.params_.dimensions = new THREE.Vector3(...params.dimensions);
      if (hack_defs.useFlatTerrain) {
        this.terrainGenerator_ = new TerrainGeneratorFlat(params);
      } else {
        this.terrainGenerator_ = new TerrainGeneratorWorld(params);
        // this.terrainGenerator_ = new TerrainGeneratorBasicPerlin(params);
        // this.terrainGenerator_ = new TerrainGeneratorMoon(params);
      }
    }

    GenerateNoise_(x, y) {
      return this.terrainGenerator_.Get(x, y);
    }

    Key_(x, y, z) {
      return x + '.' + y + '.' + z;
    }

    PruneHiddenVoxels_(cells) {
      if (hack_defs.skipPruning) {
        return Object.assign({}, cells);
      }

      const prunedVoxels = {};
      for (let k in cells) {
        const curCell = cells[k];

        const k1 = this.Key_(
            curCell.position[0] + 1,
            curCell.position[1],
            curCell.position[2]);
        const k2 = this.Key_(
            curCell.position[0] - 1,
            curCell.position[1],
            curCell.position[2]);
        const k3 = this.Key_(
            curCell.position[0],
            curCell.position[1] + 1,
            curCell.position[2]);
        const k4 = this.Key_(
            curCell.position[0],
            curCell.position[1] - 1,
            curCell.position[2]);
        const k5 = this.Key_(
            curCell.position[0],
            curCell.position[1],
            curCell.position[2] + 1);
        const k6 = this.Key_(
            curCell.position[0],
            curCell.position[1],
            curCell.position[2] - 1);

        const keys = [k1, k2, k3, k4, k5, k6];
        let visible = false;
        for (let i = 0; i < 6; ++i) {
          const faceHidden = (keys[i] in cells);
          curCell.facesHidden[i] = faceHidden;

          if (!faceHidden) {
            visible = true;
          }
        }

        if (visible) {
          prunedVoxels[k] = curCell;
        }
      }
      return prunedVoxels;
    }

    CreateFoliageSDFs_() {
      const sdfs = new SDFList();

      if (hack_defs.hardcodedFoliageEnabled) {
        const xPos = 10;
        const zPos = 10;
        const yPos = 0;

        // sdfs.Add(foliage_sdfs.SPHERE(0, 10, 0, 10));
        // sdfs.Add(foliage_sdfs.TREE2(0, 0, 0));
        // sdfs.Add(foliage_sdfs.PALM_TREE1(0, 0, 0));

        // sdfs.Add(foliage_sdfs.TREE2(50, 0, -50));
        // sdfs.Add(foliage_sdfs.TREE2(70, 0, 10));
        // sdfs.Add(foliage_sdfs.CONE1(0, 0, 0));
        // sdfs.Add(foliage_sdfs.CRATER1(10, 0, 10));

        sdfs.Add(foliage_sdfs.TREE1(19568, 0, 1608));

        // sdfs.Add(foliage_sdfs.TREE2(-1955, 13, -251));
        // sdfs.Add(foliage_sdfs.TREE2(-1855, 14, -381));
        // sdfs.Add(foliage_sdfs.TREE1(-1815, 11, -285));
      }

      if (hack_defs.foliageEnabled) {
        for (let x = -this.params_.dimensions.x * 4; x < this.params_.dimensions.x * 4; x+= 16) {
          for (let z = -this.params_.dimensions.z * 4; z < this.params_.dimensions.z * 4; z+= 16) {
            const xPos = x + this.params_.offset.x;
            const zPos = z + this.params_.offset.z;
    
            const roll = _N_Foliage.Get(xPos, 0.0, zPos);
            if (roll > 0.8) {
              const [atlasType, yOffset] = this.GenerateNoise_(xPos, zPos);
              const yPos = yOffset;
    
              if (yPos <= _OCEAN_LEVEL) {
                continue;
              }

              if (atlasType == 'grass') {
                let treeType = foliage_sdfs.TREE1;
                if (_N_Foliage.Get(xPos, 1.0, zPos) < 0.15) {
                  treeType = foliage_sdfs.TREE2;
                }
                sdfs.Add(treeType(xPos, yPos, zPos));
              } else if (atlasType == 'sand') {
                let treeType = foliage_sdfs.PALM_TREE1;
                sdfs.Add(treeType(xPos, yPos, zPos));
              }
            }
          }
        }  
      }
      return sdfs;
    }

    CreateTerrain_() {
      const cells = {};
      const toRemove = [];

      const xn = hack_defs.skipExteriorBlocks ? 0 : -1;
      const zn = hack_defs.skipExteriorBlocks ? 0 : -1;
      const xp = (hack_defs.skipExteriorBlocks ?
          this.params_.dimensions.x : this.params_.dimensions.x + 1);
      const zp = (hack_defs.skipExteriorBlocks ?
          this.params_.dimensions.x : this.params_.dimensions.x + 1);

      for (let x = xn; x < xp; x++) {
        for (let z = zn; z < zp; z++) {
          const xPos = x + this.params_.offset.x;
          const zPos = z + this.params_.offset.z;

          const [atlasType, yOffset] = this.GenerateNoise_(xPos, zPos);
          const yPos = yOffset;

          const k = this.Key_(xPos, yPos, zPos);

          cells[k] = {
            position: [xPos, yPos, zPos],
            type: atlasType,
            visible: true,
            facesHidden: [false, false, false, false, false],
            ao: [null, null, null, null, null, null],
          };

          // HACK
          if (hack_defs.introEnabled) {
            for (let yi = yPos - 1; yi > -20; yi--) {
              const ky = this.Key_(xPos, yi, zPos);
    
              cells[ky] = {
                position: [xPos, yi, zPos],
                type: 'dirt',
                visible: true,
                facesHidden: [false, false, false, false, false],
                ao: [null, null, null, null, null, null],
              };
            }
          }

          // Possibly have to generate cliffs
          let lowestAdjacent = yOffset;
          for (let xi = -1; xi <= 1; xi++) {
            for (let zi = -1; zi <= 1; zi++) {
              const [_, otherOffset] = this.GenerateNoise_(xPos + xi, zPos + zi);
              lowestAdjacent = Math.min(otherOffset, lowestAdjacent);
            }
          }

          if (lowestAdjacent < yOffset) {
            for (let yi = lowestAdjacent + 1; yi < yOffset; yi++) {
              const ki = this.Key_(xPos, yi, zPos);
              cells[ki] = {
                position: [xPos, yi, zPos],
                type: atlasType,
                visible: true,
                facesHidden: [false, false, false, false, false],
                ao: [null, null, null, null, null, null],
              };

              if (atlasType == 'grass' || atlasType == 'snow') {
                cells[ki].type = 'dirt';
              }
            }
          }
        }
      }

      return cells;
    }

    ApplySDFsToVoxels_(sdfs, cells) {
      const p1 = this.params_.offset.clone();
      const p2 = this.params_.offset.clone().add(this.params_.dimensions);
      const aabb = new THREE.Box3(p1, p2);

      if (sdfs.Intersects(aabb) || true) {
        for (let x = -1; x < this.params_.dimensions.x + 1; x++) {
          for (let z = -1; z < this.params_.dimensions.z + 1; z++) {
            const xPos = x + this.params_.offset.x;
            const zPos = z + this.params_.offset.z;
            const [_, yOffset] = this.GenerateNoise_(xPos, zPos);

            for (let y = 0; y < 100; y++) {
              const yPos = yOffset + y;
              const k = this.Key_(xPos, yPos, zPos);
              if (k in cells) {
                continue;
              }

              const res = sdfs.Evaluate(xPos, yPos, zPos);
              if (res) {
                let roll = 0;
                if (res == 'tree_leaves' && !hack_defs.skipFoliageNoise) {
                  roll = _N_Foliage.Get(xPos, yPos, zPos);
                }
                if (roll < 0.7) {
                  cells[k] = {
                    position: [xPos, yPos, zPos],
                    type: res,
                    visible: true,
                    facesHidden: [false, false, false, false, false],
                    ao: [null, null, null, null, null, null],
                  };
                }
              }
            }
          }
        }
      }
    }

    CreateOcean_(groundVoxels) {
      const cells = {};

      for (let x = -1; x < this.params_.dimensions.x + 1; x++) {
        for (let z = -1; z < this.params_.dimensions.z + 1; z++) {
          const xPos = x + this.params_.offset.x;
          const zPos = z + this.params_.offset.z;

          const [_, yPos] = this.GenerateNoise_(xPos, zPos);

          if (yPos < _OCEAN_LEVEL) {
            const ko = this.Key_(xPos, _OCEAN_LEVEL, zPos);
            cells[ko] = {
              position: [xPos, _OCEAN_LEVEL, zPos],
              type: 'ocean',
              visible: true,
              facesHidden: [false, false, false, false, false],
              ao: [null, null, null, null, null, null],
            };

            // HACK
            if (hack_defs.introEnabled) {
              for (let yi = 1; yi < 20; ++yi) {
                const ky = this.Key_(xPos, _OCEAN_LEVEL - yi, zPos);
    
                if (!(ky in groundVoxels)) {
                  cells[ky] = {
                    position: [xPos, yi, zPos],
                    type: 'ocean',
                    visible: true,
                    facesHidden: [false, false, false, false, false],
                    ao: [null, null, null, null, null, null],
                  };
                }
              }
            }
          }
        }
      }

      return cells;
    }

    BuildAO_(cells) {
      if (hack_defs.skipAO) {
        return;
      }
      for (let k in cells) {
        const curCell = cells[k];

        const _Occlusion = (x, y, z) => {
          const k = this.Key_(
              curCell.position[0] + x, curCell.position[1] + y, curCell.position[2] + z);
          if (k in cells) {
            return 0.75;
          }
          return 1.0;
        }


        // +x
        if (!curCell.facesHidden[0]) {
          curCell.ao[0] = [
            _Occlusion(1, 0, 1) * _Occlusion(1, 1, 0) * _Occlusion(1, 1, 1),
            _Occlusion(1, 0, -1) * _Occlusion(1, 1, 0) * _Occlusion(1, 1, -1),
            _Occlusion(1, 0, 1) * _Occlusion(1, -1, 0) * _Occlusion(1, -1, 1),
            _Occlusion(1, 0, -1) * _Occlusion(1, -1, 0) * _Occlusion(1, -1, -1)
          ];
        }

        // -x
        if (!curCell.facesHidden[1]) {
          curCell.ao[1] = [
            _Occlusion(-1, 0, -1) * _Occlusion(-1, 1, 0) * _Occlusion(-1, 1, -1),
            _Occlusion(-1, 0, 1) * _Occlusion(-1, 1, 0) * _Occlusion(-1, 1, 1),
            _Occlusion(-1, 0, -1) * _Occlusion(-1, -1, 0) * _Occlusion(-1, -1, -1),
            _Occlusion(-1, 0, 1) * _Occlusion(-1, -1, 0) * _Occlusion(-1, -1, 1),
          ];
        }

        // +y
        if (!curCell.facesHidden[2]) {
          // curCell.ao[2] = [1.0, 1.0, 0.5, 0.5];
          curCell.ao[2] = [
            _Occlusion(0, 1, -1) * _Occlusion(-1, 1, 0) * _Occlusion(-1, 1, -1),
            _Occlusion(0, 1, -1) * _Occlusion(1, 1, 0) * _Occlusion(1, 1, -1),
            _Occlusion(0, 1, 1) * _Occlusion(-1, 1, 0) * _Occlusion(-1, 1, 1),
            _Occlusion(0, 1, 1) * _Occlusion(1, 1, 0) * _Occlusion(1, 1, 1),
          ];
        }

        // -y
        if (!curCell.facesHidden[3]) {
          curCell.ao[3] = [
            _Occlusion(0, -1, 1) * _Occlusion(-1, -1, 0) * _Occlusion(-1, -1, 1),
            _Occlusion(0, -1, 1) * _Occlusion(1, -1, 0) * _Occlusion(1, -1, 1),
            _Occlusion(0, -1, -1) * _Occlusion(-1, -1, 0) * _Occlusion(-1, -1, -1),
            _Occlusion(0, -1, -1) * _Occlusion(1, -1, 0) * _Occlusion(1, -1, -1),
          ];
        }

        // +z
        if (!curCell.facesHidden[4]) {
          curCell.ao[4] = [
            _Occlusion(-1, 0, 1) * _Occlusion(0, 1, 1) * _Occlusion(-1, 1, 1),
            _Occlusion(1, 0, 1) * _Occlusion(0, 1, 1) * _Occlusion(1, 1, 1),
            _Occlusion(-1, 0, 1) * _Occlusion(0, -1, 1) * _Occlusion(-1, -1, 1),
            _Occlusion(1, 0, 1) * _Occlusion(0, -1, 1) * _Occlusion(1, -1, 1),
          ];
        }

        // -z
        if (!curCell.facesHidden[5]) {
          curCell.ao[5] = [
            _Occlusion(1, 0, -1) * _Occlusion(0, 1, -1) * _Occlusion(1, 1, -1),
            _Occlusion(-1, 0, -1) * _Occlusion(0, 1, -1) * _Occlusion(-1, 1, -1),
            _Occlusion(1, 0, -1) * _Occlusion(0, -1, -1) * _Occlusion(1, -1, -1),
            _Occlusion(-1, 0, -1) * _Occlusion(0, -1, -1) * _Occlusion(-1, -1, -1),
          ];
        }
      }
      return cells;
    }

    ApplyFadeIn_(cells) {
      if (this.params_.currentTime < 0.0 || this.params_.currentTime > 1.0) {
        return;
      }

      const timeBiased = this.params_.currentTime ** 2;
      const yLowerBound = timeBiased;
      const yUpperBound = timeBiased + 0.1;
      const yRange = yUpperBound - yLowerBound;

      const toRemove = [];
      for (let k in cells) {
        const curCell = cells[k];

        const roll = _N_FadeIn.Get(...curCell.position);

        const yNormalized = (curCell.position[1] + 50.0) / 250.0;
        const yFactor = (yNormalized - yLowerBound) / yRange;
        if (roll < yFactor) {
          toRemove.push(k);
        }
      }

      for (let i = 0; i < toRemove.length; ++i) {
        delete cells[toRemove[i]];
      }
    }

    RemoveExteriorVoxels_(cells) {
      const toRemove = [];
      const xMin = this.params_.offset.x;
      const zMin = this.params_.offset.z;
      const xMax = this.params_.offset.x + this.params_.dimensions.x;
      const zMax = this.params_.offset.z + this.params_.dimensions.z;

      for (let k in cells) {
        const cell = cells[k];
        if (cell.position[0] < xMin || cell.position[0] >= xMax ||
            cell.position[2] < zMin || cell.position[2] >= zMax) {
          toRemove.push(k);        
        }
      }
      for (let i = 0; i < toRemove.length; ++i) {
        delete cells[toRemove[i]];
      }
    }

    MergeCustomVoxels_(cells) {
      const customVoxels = this.params_.customVoxels;

      const toRemove = [];
      for (let k in customVoxels) {
        const c = customVoxels[k];
        if (c.visible) {
          c.facesHidden = [false, false, false, false, false];
          c.ao = [null, null, null, null, null, null];
        } else {
          toRemove.push(k);
        }
      }
      Object.assign(cells, customVoxels);

      for (let i = 0; i < toRemove.length; ++i) {
        delete cells[toRemove[i]];
      }
    }

    RemoveVoxelAndFill_(pos, voxels) {
      const kv = this.Key_(...pos);

      const custom = {};
      custom[kv] = {
          position: [...pos],
          visible: false,
      };

      const [_, groundLevel] = this.GenerateNoise_(pos[0], pos[2]);

      if (pos[1] <= groundLevel) {
        for (let xi = -1; xi <= 1; xi++) {
          for (let yi = -1; yi <= 1; yi++) {
            for (let zi = -1; zi <= 1; zi++) {
              const xPos = pos[0] + xi;
              const yPos = pos[1] + yi;
              const zPos = pos[2] + zi;

              const [voxelType, groundLevelAdjacent] = this.GenerateNoise_(xPos, zPos);
              const k = this.Key_(xPos, yPos, zPos);

              if (!(k in voxels) && yPos < groundLevelAdjacent) {
                let type = 'dirt';

                if (voxelType == 'sand') {
                  type = 'sand';
                }

                if (yPos < groundLevelAdjacent - 2) {
                  type = 'stone';
                }

                if (voxelType == 'moon') {
                  type = 'moon';
                }

                custom[k] = {
                    position: [xPos, yPos, zPos],
                    type: type,
                    visible: true,
                };
              }
            }
          }
        }
      }
      return custom;
    }

    Rebuild() {
      // Create terrain
      const terrainVoxels = this.CreateTerrain_();

      // Create trees and shit
      // You need to create the SDF's for adjacent voxels, in case they bleed over
      const sdfs = this.CreateFoliageSDFs_();

      this.ApplySDFsToVoxels_(sdfs, terrainVoxels);

      const oceanVoxels = !hack_defs.skipOceans ? this.CreateOcean_(terrainVoxels) : {};

      this.ApplyFadeIn_(oceanVoxels);
      this.ApplyFadeIn_(terrainVoxels);

      // Now prune it a bit, these need to be done separately
      const prunedMeshVoxels = this.PruneHiddenVoxels_(terrainVoxels);
      const prunedOceanVoxels = this.PruneHiddenVoxels_(oceanVoxels);

      this.BuildAO_(prunedMeshVoxels);

      // By specifying mesh second, it overwrites any potential ocean voxels, which
      // is what we want.
      const prunedVoxels = Object.assign({}, prunedOceanVoxels, prunedMeshVoxels);

      // Remove extra
      this.RemoveExteriorVoxels_(prunedVoxels);

      const data = this.BuildMeshDataFromVoxels_(prunedVoxels);

      // Full set to be retained by block instance.
      const voxels = Object.assign({}, terrainVoxels, oceanVoxels);

      this.RemoveExteriorVoxels_(voxels);

      for (let k in voxels) {
        const c = voxels[k];
        voxels[k] = {
            type: c.type,
            position: c.position,
            visible: c.visible,
        };
      }

      data.voxels = voxels;

      return data;
    }

    PartialRebuild(existingVoxels, neighbouringVoxels) {
      const voxels = Object.assign({}, existingVoxels, neighbouringVoxels);
      const toRemove = [];
      for (let k in voxels) {
        const c = voxels[k];
        if (c.visible) {
          c.facesHidden = [false, false, false, false, false];
          c.ao = [null, null, null, null, null, null];
        } else {
          toRemove.push(k);
        }
      }

      for (let i = 0; i < toRemove.length; ++i) {
        delete voxels[toRemove[i]];
      }

      const prunedVoxels = this.PruneHiddenVoxels_(voxels);

      this.BuildAO_(prunedVoxels);

      // Remove extra
      this.RemoveExteriorVoxels_(prunedVoxels);

      const data = this.BuildMeshDataFromVoxels_(prunedVoxels);

      data.voxels = existingVoxels;

      return data;
    }

    BuildMeshDataFromVoxels_(cells) {
      const meshes = {};

      meshes.opaque = {
          positions: [],
          uvs: [],
          uvSlices: [], 
          normals: [],
          indices: [],
          colours: [],
      };
      meshes.transparent = {
          positions: [],
          uvs: [],
          uvSlices: [], 
          normals: [],
          indices: [],
          colours: [],
      };

      for (let c in cells) {
        const curCell = cells[c];

        for (let i = 0; i < 6; ++i) {
          if (curCell.facesHidden[i]) {
            continue;
          }

          const targetData = curCell.type == 'ocean' ? meshes.transparent : meshes.opaque;

          const bi = targetData.positions.length / 3;
          const localPositions = [...this.geometries_[i].attributes.position.array];
          for (let j = 0; j < 3; ++j) {
            for (let v = 0; v < 4; ++v) {
              localPositions[v * 3 + j] += curCell.position[j];
            }
          }
          targetData.positions.push(...localPositions);
          targetData.uvs.push(...this.geometries_[i].attributes.uv.array);
          targetData.normals.push(...this.geometries_[i].attributes.normal.array);

          const luminance = _N_Luminance.Get(...curCell.position) * 0.1 + 0.9;
          for (let v = 0; v < 4; ++v) {
            targetData.uvSlices.push(this.params_.blockTypes[curCell.type].textures[i]);

            const colour = new THREE.Color(0xFFFFFF);
            if (!hack_defs.skipVariableLuminance) {
              colour.multiplyScalar(luminance);
            }

            if (curCell.ao[i]) {
              colour.multiplyScalar(curCell.ao[i][v]);
            }

            colour.convertSRGBToLinear();
      
            targetData.colours.push(colour.r, colour.g, colour.b);
          }

          const localIndices = [...this.geometries_[i].index.array];
          for (let j = 0; j < localIndices.length; ++j) {
            localIndices[j] += bi;
          }
          targetData.indices.push(...localIndices);
        }
      }

      const bytesInFloat32 = 4;
      const bytesInInt32 = 4;

      const data = {};

      for (let k in meshes) {
        const positionsArray = new Float32Array(
            new ArrayBuffer(bytesInFloat32 * meshes[k].positions.length));
        const normalsArray = new Float32Array(
            new ArrayBuffer(bytesInFloat32 * meshes[k].normals.length));
        const uvsArray = new Float32Array(
            new ArrayBuffer(bytesInFloat32 * meshes[k].uvs.length));
        const uvSlicesArray = new Float32Array(
            new ArrayBuffer(bytesInFloat32 * meshes[k].uvSlices.length));
        const coloursArray = new Float32Array(
            new ArrayBuffer(bytesInFloat32 * meshes[k].colours.length));
        const indicesArray = new Uint32Array(
            new ArrayBuffer(bytesInInt32 * meshes[k].indices.length));

        positionsArray.set(meshes[k].positions, 0);
        normalsArray.set(meshes[k].normals, 0);
        uvsArray.set(meshes[k].uvs, 0);
        uvSlicesArray.set(meshes[k].uvSlices, 0);
        coloursArray.set(meshes[k].colours, 0);
        indicesArray.set(meshes[k].indices, 0);

        data[k] = {
            positions: positionsArray,
            uvs: uvsArray,
            uvSlices: uvSlicesArray,
            normals: normalsArray,
            colours: coloursArray,
            indices: indicesArray,
        };
      }

      data.buildId = this.params_.buildId;

      return data;
    }
  };

  return {
      VoxelBlockBuilder: _VoxelBuilderThreadedWorker,
  };
})();