import { usePlane } from '@react-three/cannon';
import React, { useContext } from "react";
import { MaterialsContext } from '../MaterialsContext';

export default function Ground({ transparent, color, visible = false, contactMaterial = {}, ...props }) {
    const [ref] = usePlane(() => ({
      mass: 0,
      ...props,
    }));
    const { greenWireframe } = useContext(MaterialsContext)
    return (
      <mesh visible={visible} receiveShadow ref={ref} material={greenWireframe}>
        <planeBufferGeometry attach="geometry" args={[100, 100, 100, 100]} />
        {/* <meshStandardMaterial attach="material" color={color} /> */}
      </mesh>
    );
  }
  