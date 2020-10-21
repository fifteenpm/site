import React, { useMemo, useContext, useRef, useState, useEffect } from 'react';
import { MaterialsContext } from './MaterialsContext';
import { a } from '@react-spring/three';
import '../../Common/Geometries/CylinderCurvedSurfaceGeometry.js';
import useYScroll from '../../Common/Scroll/useYScroll';

export default function ArrienZinghiniCurvedScreen({ width, height, width_segments = 1, height_segments = 100, }) {
    const { videoShader } = useContext(MaterialsContext);
    const [ys] = useYScroll([-2400, 2400], { domTarget: window });
    const sharedArgs = useMemo(() => {
        return [
            width/2, //radius
            height,
            Math.PI /2,
            Math.PI, 
            width, 
            height,
        ];
    })
    return <>
        
            <group>
        <mesh material={videoShader} rotation-y={3 * Math.PI / 4}>
                <cylinderCurvedSurfaceGeometry attach="geometry" args={sharedArgs} />
            </mesh> 
            <mesh material={videoShader} rotation-y={Math.PI / 4}>
                <cylinderCurvedSurfaceGeometry attach="geometry" args={sharedArgs} />
            </mesh>
            <mesh material={videoShader} rotation-y={-3 * Math.PI / 4} >
                {/* rotation-y={Math.PI/4}> */}
                <cylinderCurvedSurfaceGeometry attach="geometry" args={sharedArgs} />
            </mesh>
            <mesh material={videoShader} rotation-y={-Math.PI / 4}>
                <cylinderCurvedSurfaceGeometry attach="geometry" args={sharedArgs} />
            </mesh>
        </group>
    </>
}
