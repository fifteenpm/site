import { useBox } from '@react-three/cannon';
import React, { useContext } from "react";
import { MaterialsContext } from '../MaterialsContext';

export default function HittableSurface({ transparent, color, boxArgs, visible = false, contactMaterial = {}, ...props }) {
    const [ref] = useBox(() => ({
      args: boxArgs,
      material: contactMaterial,
      ...props,
    }));
    const { wireframe, naiveGlass, foamGrip } = useContext(MaterialsContext)
    return (
      // <mesh receiveShadow ref={ref} >
      <mesh visible={visible} receiveShadow ref={ref} material={wireframe}>
        {/* <planeBufferGeometry attach="geometry" args={boxArgs} /> */}
        <boxBufferGeometry attach="geometry" args={boxArgs} />
        {/* <meshStandardMaterial attach="material" color={color} /> */}
      </mesh>
    );
  }
  