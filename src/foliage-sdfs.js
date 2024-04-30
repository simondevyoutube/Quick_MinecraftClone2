import * as THREE from 'three';

import {noise} from './noise.js';
import {math} from './math.js';


export const foliage_sdfs = (() => {

  function sdCappedCone(p, a, b, ra, rb) {
    const ba = b.clone().sub(a);
    const pa = p.clone().sub(a);
    const rba  = rb - ra;
    const baba = ba.dot(ba);
    const papa = pa.dot(pa);
    const paba = pa.dot(ba) / baba;
    const x = Math.sqrt(papa - paba * paba * baba);
    const cax = Math.max(0.0, x - ((paba < 0.5) ? ra : rb));
    const cay = Math.abs(paba - 0.5) - 0.5;
    const k = rba * rba + baba;
    const f = math.sat((rba * (x - ra) + paba * baba) / k);
    const cbx = x - ra - f * rba;
    const cby = paba - f;
    const s = (cbx < 0.0 && cay < 0.0) ? -1.0 : 1.0;
    return s * Math.sqrt(
        Math.min(cax * cax + cay * cay * baba,
                 cbx * cbx + cby * cby * baba));
  }
  
  function sdCappedCylinder(p, a, b, r) {
    const ba = b.clone().sub(a);
    const pa = p.clone().sub(a);
    const baba = ba.dot(ba);
    const paba = pa.dot(ba);
  
    // const x = length(pa*baba-ba*paba) - r*baba;
    const x = (pa.clone().multiplyScalar(baba).sub(ba.clone().multiplyScalar(paba))).length() - r * baba;
    const y = Math.abs(paba - baba * 0.5) - baba * 0.5;
    const x2 = x * x;
    const y2 = y * y * baba;
    const d = (Math.max(x, y) < 0.0) ?
        -Math.min(x2, y2) :
        (((x > 0.0) ? x2 : 0.0) + ((y > 0.0) ? y2 : 0.0));
    return Math.sign(d) * Math.sqrt(Math.abs(d)) / baba;
  }
  
  function sdSphere(pos, radius) {
    return pos.length() - radius;
  }
  
  
  const _TMP1 = new THREE.Vector3();
  const _TMP_B1 = new THREE.Box3();
  const _TMP_B2 = new THREE.Box3();
  const _TMP_B3 = new THREE.Box3();
  const _TMP_S1 = new THREE.Sphere();
  const _TMP_Q = new THREE.Quaternion();
  const _TMP_Q1 = new THREE.Quaternion();
  const _TMP_Q2 = new THREE.Quaternion();
  const _X_AXIS = new THREE.Vector3(1, 0, 0);
  const _Y_AXIS = new THREE.Vector3(0, 1, 0);
  const _Z_AXIS = new THREE.Vector3(0, 0, 1);
  const _ORIGIN = new THREE.Vector3();
  
  class SDF {
    constructor(pos) {
      this.sdfs_ = [];
      this.pos_ = pos.clone();
      this.aabb_ = new THREE.Box3(
          this.pos_.clone(), this.pos_.clone());
    }
  
    get AABB() {
      return this.aabb_;
    }
  
    AddSphere(type, origin, radius) {
      _TMP_S1.set(this.pos_.clone(), radius);
      _TMP_S1.translate(origin);
      _TMP_S1.getBoundingBox(_TMP_B1);
  
      this.aabb_.union(_TMP_B1);
  
      const o = origin.clone();
  
      this.sdfs_.push((pos) => {
        _TMP1.copy(pos);
        _TMP1.sub(o);
        _TMP1.sub(this.pos_);
  
        if (sdSphere(_TMP1, radius) < 0) {
          return type;
        }
        return null;
      });
    }
  
    AddCappedCone(type, offset, start, end, startRadius, endRadius) {
      _TMP_S1.set(start.clone(), startRadius);
      _TMP_S1.getBoundingBox(_TMP_B2);
  
      _TMP_S1.set(end.clone(), endRadius);
      _TMP_S1.getBoundingBox(_TMP_B3);
  
      _TMP_B1.makeEmpty();
      _TMP_B1.union(_TMP_B2);
      _TMP_B1.union(_TMP_B3);
      _TMP_B1.translate(offset);
      _TMP_B1.translate(this.pos_);
  
      this.aabb_.union(_TMP_B1);
  
      const s = start.clone();
      const e = end.clone();
      const o = offset.clone();
  
      this.sdfs_.push((pos) => {
        _TMP1.copy(pos);
        _TMP1.sub(o);
        _TMP1.sub(this.pos_);
  
        if (sdCappedCone(_TMP1, s, e, startRadius, endRadius) < 0) {
          return type;
        }
        return null;
      });
    }
  
    Evaluate(pos) {
      for (let i = 0; i < this.sdfs_.length; ++i) {
        const res = this.sdfs_[i](pos);
        if (res) {
          return res;
        }
      }
      return null;
    }
  };

  const _N_Foliage = new noise.Noise({
    seed: 7,
    octaves: 1,
    scale: 1,
    persistence: 0.5,
    lacunarity: 2.0,
    exponentiation: 1,
    height: 1,
  });

  function SPHERE(xPos, yPos, zPos, radius) {
    const treeSDF = new SDF(new THREE.Vector3(xPos, yPos, zPos));
    treeSDF.AddSphere('stone', new THREE.Vector3(), radius);
    return treeSDF;
  };

  function CONE1(xPos, yPos, zPos) {
    const treeSDF = new SDF(new THREE.Vector3(xPos, yPos, zPos));
    treeSDF.AddCappedCone(
        'tree_bark',
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(0, 20, 0), 5, 5);
    return treeSDF;
  };

  function TREE1(xPos, yPos, zPos) {
    // HACK
    const height = 15;//_N_Foliage.Get(xPos, 1.0, zPos) * 20 + 10;
    const lean = 5;//_N_Foliage.Get(xPos, 2.0, zPos) * 5 + 4;
    const trunkEnd = new THREE.Vector3(lean, height, 0);
    const rootEnd1 = new THREE.Vector3(-6, 0, 1);
    const rootEnd2 = new THREE.Vector3(9, 0, -7);
    const rootEnd3 = new THREE.Vector3(8, 0, 6);

    const leavesRadius = 4;//_N_Foliage.Get(xPos, 1.0, zPos) * height * 0.125 + height * 0.25;
    const angle = _N_Foliage.Get(xPos, 9.0, zPos) * 2 * Math.PI;
    _TMP_Q.setFromAxisAngle(_Y_AXIS, angle);

    trunkEnd.applyQuaternion(_TMP_Q);
    rootEnd1.applyQuaternion(_TMP_Q);
    rootEnd2.applyQuaternion(_TMP_Q);
    rootEnd3.applyQuaternion(_TMP_Q);

    // const leavesPos1 = trunkEnd.clone().add(new THREE.Vector3(-6, -2, -1));
    // const leavesPos2 = trunkEnd.clone().add(new THREE.Vector3(9, -1, -3));
    const treeSDF = new SDF(new THREE.Vector3(xPos, yPos, zPos));
    treeSDF.AddCappedCone(
        'tree_bark',
        new THREE.Vector3(),
        new THREE.Vector3(0, -2, 0),
        trunkEnd, 3, 0.5);
    treeSDF.AddCappedCone(
        'tree_bark',
        new THREE.Vector3(),
        new THREE.Vector3(0, 4, 0),
        rootEnd1, 1, 1);
    treeSDF.AddCappedCone(
        'tree_bark',
        new THREE.Vector3(),
        new THREE.Vector3(0, 4, 0),
        rootEnd2, 2, 1);
    treeSDF.AddCappedCone(
        'tree_bark',
        new THREE.Vector3(),
        new THREE.Vector3(0, 4, 0),
        rootEnd3, 2, 1);
    treeSDF.AddSphere('tree_leaves', trunkEnd, leavesRadius);
    // treeSDF.AddSphere(leavesPos1, 4);
    // treeSDF.AddSphere(leavesPos2, 4);
    return treeSDF;
  };

  function TREE2(xPos, yPos, zPos) {
    let noiseID = 100;

    const height = _N_Foliage.Get(xPos, 1.0, zPos) * 20 + 20;
    const lean = _N_Foliage.Get(xPos, 2.0, zPos) * 5 + 4;

    const treeSDF = new SDF(new THREE.Vector3(xPos, yPos, zPos));
    const angle1 = (0.01 + _N_Foliage.Get(xPos, noiseID++, zPos) * 0.02) * 2 * Math.PI;
    const angle2 = _N_Foliage.Get(xPos, noiseID++, zPos) * 2 * Math.PI;

    const _AddBranch = (base, height, width, rot, level) => {
      width = Math.max(width, 1);
      
      if (level > 6) {
        _TMP_Q.copy(rot);

        _TMP1.set(0, 5, 0);
        _TMP1.applyQuaternion(rot);
        _TMP1.add(base);
        treeSDF.AddSphere('tree_leaves', _TMP1, 5);
        return;
      }

      const branchEnd = new THREE.Vector3(0, height, 0);
      const angle1 = (0.03 + _N_Foliage.Get(xPos, noiseID++, zPos) * 0.08) * 2 * Math.PI;
      const angle2 = (0.25 + _N_Foliage.Get(xPos, noiseID++, zPos) * 0.25) * 2 * Math.PI;

      branchEnd.applyQuaternion(rot);
      branchEnd.add(base);
      treeSDF.AddCappedCone('tree_bark', _ORIGIN, base, branchEnd, width, width * 0.6);

      _TMP_Q1.setFromAxisAngle(_X_AXIS, angle1);
      _TMP_Q2.setFromAxisAngle(_Y_AXIS, angle2);
      _TMP_Q.copy(rot);
      _TMP_Q.multiply(_TMP_Q2);
      _TMP_Q.multiply(_TMP_Q1);

      _AddBranch(branchEnd.clone(), height * 0.6, width * 0.6, _TMP_Q.clone(), level + 1);

      const angle3 = (_N_Foliage.Get(xPos, noiseID++, zPos) * 0.01) * 2 * Math.PI;
      const angle4 = (_N_Foliage.Get(xPos, noiseID++, zPos) * 0.25) * 2 * Math.PI;

      _TMP_Q1.setFromAxisAngle(_X_AXIS, -(angle1 + angle3));
      _TMP_Q2.setFromAxisAngle(_Y_AXIS, -(angle2 + angle4));
      _TMP_Q.copy(rot);
      _TMP_Q.multiply(_TMP_Q2);
      _TMP_Q.multiply(_TMP_Q1);

      _AddBranch(branchEnd.clone(), height * 0.6, width * 0.6, _TMP_Q.clone(), level + 1);
    };

    _TMP_Q1.setFromAxisAngle(_X_AXIS, angle1);
    _TMP_Q2.setFromAxisAngle(_Y_AXIS, angle2);
    _TMP_Q.copy(_TMP_Q2);
    _TMP_Q.multiply(_TMP_Q1);
    _AddBranch(new THREE.Vector3(0, -5, 0), 20, 5, _TMP_Q.clone(), 1);

    treeSDF.AddCappedCone(
        'tree_bark',
        new THREE.Vector3(),
        new THREE.Vector3(0, 3, 0),
        new THREE.Vector3(12, -1, 0), 2, 1);

    treeSDF.AddCappedCone(
        'tree_bark',
        new THREE.Vector3(),
        new THREE.Vector3(0, 4, 0),
        new THREE.Vector3(-8, -1, -11), 2, 1);
    treeSDF.AddCappedCone(
        'tree_bark',
        new THREE.Vector3(),
        new THREE.Vector3(0, 2, 0),
        new THREE.Vector3(-13, -1, -4), 2, 1);
    return treeSDF;
  };


  function PALM_TREE1(xPos, yPos, zPos) {
    let noiseID = 100;

    const treeSDF = new SDF(new THREE.Vector3(xPos, yPos, zPos));
    const angle1 = (0.01 + _N_Foliage.Get(xPos, noiseID++, zPos) * 0.02) * 2 * Math.PI;
    const angle2 = _N_Foliage.Get(xPos, noiseID++, zPos) * 2 * Math.PI;

    const _AddLeaf = (base, height, width, rot, level) => {
      if (level > 7) {
        return;
      }
      const branchEnd = new THREE.Vector3(4, 0, 0);
      const angle1 = -0.075 * 2 * Math.PI;

      branchEnd.applyQuaternion(rot);
      branchEnd.add(base);
      treeSDF.AddCappedCone('tree_leaves', _ORIGIN, base, branchEnd, width, width);

      _TMP_Q1.setFromAxisAngle(_Z_AXIS, angle1);
      _TMP_Q.copy(rot);
      _TMP_Q.multiply(_TMP_Q1);

      _AddLeaf(branchEnd.clone(), height, width, _TMP_Q.clone(), level + 1);
    };

    const _AddBranch = (base, height, width, rot, level) => {
      width = Math.max(width, 1);

      if (level > 3) {
        _AddLeaf(base, height, 1, new THREE.Quaternion(), level);

        _TMP_Q2.setFromAxisAngle(_Y_AXIS, 0.33 * 2.0 * Math.PI);
        _AddLeaf(base, height, 1, _TMP_Q2.clone(), level);

        _TMP_Q2.setFromAxisAngle(_Y_AXIS, 0.66 * 2.0 * Math.PI);
        _AddLeaf(base, height, 1, _TMP_Q2.clone(), level);
        return;
      }

      const branchEnd = new THREE.Vector3(0, height, 0);
      const angle1 = (0.05 + _N_Foliage.Get(xPos, noiseID++, zPos) * 0.02) * 2 * Math.PI;

      branchEnd.applyQuaternion(rot);
      branchEnd.add(base);
      treeSDF.AddCappedCone('tree_bark', _ORIGIN, base, branchEnd, width, width * 0.6);

      _TMP_Q1.setFromAxisAngle(_X_AXIS, angle1);
      _TMP_Q.copy(rot);
      _TMP_Q.multiply(_TMP_Q1);

      _AddBranch(branchEnd.clone(), height * 0.75, width * 0.75, _TMP_Q.clone(), level + 1);
    };

    _TMP_Q1.setFromAxisAngle(_X_AXIS, angle1);
    _TMP_Q2.setFromAxisAngle(_Y_AXIS, angle2);
    _TMP_Q.copy(_TMP_Q2);
    _TMP_Q.multiply(_TMP_Q1);
    _AddBranch(new THREE.Vector3(0, -5, 0), 15, 2, _TMP_Q.clone(), 1);

    return treeSDF;
  };

  return {
      TREE1: TREE1,
      TREE2: TREE2,
      PALM_TREE1: PALM_TREE1,
      SPHERE: SPHERE,
      CONE1: CONE1,
  };
})();