import React, { useContext, useRef, useEffect } from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import { MaterialsContext } from './MaterialsContext';
import Orbit from '../../Common/Controls/Orbit';

export default function ArrienZinghiniVideoScreen({ width, height }) {
    const { video } = useContext(MaterialsContext);
    const ArrienZinghiniVideoScreen = useRef();

    return (
        <>
            <group ref={ArrienZinghiniVideoScreen}>
                <mesh material={video} >
                    <planeBufferGeometry args={[width, height]} attach="geometry" />
                </mesh>
            </group>
        </>
    )
}
