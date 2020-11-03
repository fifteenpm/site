import React, { useContext, useRef, useEffect } from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import { MaterialsContext } from './MaterialsContext';

export default function ArrienZinghiniSphereScreen({ width, height }) {
    const { video } = useContext(MaterialsContext);
    const screen = useRef();

    return (
        <>
            <group ref={screen}>
                <mesh material={video} >
                    {/* radius widthSegments heightSegments */}
                    <sphereBufferGeometry args={[width, width, height]} attach="geometry" />
                </mesh>
            </group>
        </>
    )
}
