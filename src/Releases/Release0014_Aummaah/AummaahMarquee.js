import React, { useContext, useRef } from 'react';
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as C from './constants';
import { MaterialsContext } from './MaterialsContext';
export default function AummaahMarquee({ }) {
    const { nodes, materials } = useLoader(GLTFLoader, C.AUMMAAH_MARQUEE_GLB)
    const ref = useRef()
    const { orangeWireframe, sunsetGradient, magentaWireframe  } = useContext(MaterialsContext);
    return (

        <mesh ref={ref} dispose={null} rotation-x={Math.PI / 2} position={[0, -8, -50]} scale={[20, 20, 20]}>
            <group>
                <group>
                    <mesh castShadow receiveShadow material={sunsetGradient} geometry={nodes.Text.geometry} />
                </group>
            </group>
        </mesh>
    )
}

