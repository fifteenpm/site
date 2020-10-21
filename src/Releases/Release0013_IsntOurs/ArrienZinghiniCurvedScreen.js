import React, { useMemo, useContext, useRef, useState, useEffect } from 'react';
import { MaterialsContext } from './MaterialsContext';
import { a } from '@react-spring/three';
import '../../Common/Geometries/CylinderCurvedSurfaceGeometry.js';
import useYScroll from '../../Common/Scroll/useYScroll';

export default function ArrienZinghiniCurvedScreen({ width, height, width_segments = 1, height_segments = 100,  }) {
    const { videoShader } = useContext(MaterialsContext);
    const [ys] = useYScroll([-2400, 2400], { domTarget: window });
    return <>
        <a.group  rotation-y={ys.to(ys => ys / 200)}>
            <mesh material={videoShader} >
                {/* rotation-y={Math.PI/4}> */}
                <cylinderCurvedSurfaceGeometry attach="geometry"  args={[width/2, height, Math.PI/2, Math.PI, width, height]}/>
            </mesh>
        </a.group>
    </>


}
