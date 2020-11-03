import React, { useContext, useRef, useEffect } from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import { MaterialsContext } from './MaterialsContext';

export default function ArrienZinghiniSphereScreen({ width, height }) {
    const { videoShader } = useContext(MaterialsContext);
    
    // const screen = useRef();

    return (
        <>
            {/* <group ref={screen}> */}
                <mesh material={videoShader} position-z={3} rotation-y={-90} >
                    <sphereBufferGeometry args={[width/10, width, height]} attach="geometry" />
                </mesh>
            {/* </group> */}
        </>
    )
}
