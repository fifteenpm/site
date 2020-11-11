import {assetPath} from "../../../Common/Utils/assets"
import * as THREE from 'three';

export const assetPath14 = (p) => {
  return assetPath("14/" + p);
}

export const randVal = (obj) => {
  const keys = Object.keys(obj);
  const numKeys = keys.length;
  const randIdx = THREE.Math.randInt(0, numKeys - 1);
  return obj[keys[randIdx]];
}
