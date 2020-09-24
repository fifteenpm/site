import React, { useContext, useRef, useEffect } from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import { MaterialsContext } from './MaterialsContext';

export default function ArrienZinghiniVideoScreen({ width, height }) {
    const { video } = useContext(MaterialsContext);
    const screen = useRef();

    return (
        <>
            <group ref={screen}>
                <mesh material={video} >
                    <planeBufferGeometry args={[width, height]} attach="geometry" />
                </mesh>
            </group>
        </>
    )
}
