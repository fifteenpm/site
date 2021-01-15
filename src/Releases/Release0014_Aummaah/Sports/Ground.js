import { usePlane } from '@react-three/cannon';
import React, { useEffect, useContext } from "react";
import { MaterialsContext } from '../MaterialsContext';
import * as THREE from 'three'

export default function Ground({ transparent, color, visible = false, contactMaterial = {}, ...props }) {
    const [ref] = usePlane(() => ({
      mass: 0,
      ...props,
    }));
    const { wireframe } = useContext(MaterialsContext)
    useEffect(() => {
      if (!wireframe) return;
      wireframe.color.set(new THREE.Color(color))
    },[wireframe])
    return (
      <mesh visible={visible} receiveShadow ref={ref} material={wireframe}>
        <planeBufferGeometry attach="geometry" args={[100, 100, 100, 100]} />
      </mesh>
    );
  }
  