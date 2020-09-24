import React, { useMemo, useRef, useEffect, useContext, useState } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from 'react-three-fiber';
import useAudioPlayer from '../../Common/UI/Player/hooks/useAudioPlayer';
import { MaterialsProvider } from './MaterialsContext';
import ArrienZinghiniNoiseScreen from './ArrienZinghiniNoiseScreen';
import ArrienZinghiniFlatScreen from './ArrienZinghiniFlatScreen';
import * as C from './constants';
import useYScroll from '../../Common/Scroll/useYScroll'
import useXScroll from '../../Common/Scroll/useXScroll'
import { a } from '@react-spring/three'

// TODO (jeremy) performance: progressive downloading using something like https://github.com/davidgatti/How-to-Stream-Movies-using-NodeJS

export function Scene({ }) {
    const { camera, scene } = useThree();
    // const [y] = useYScroll([-2400, 2400], { domTarget: window })
    const [x] = useXScroll([-2400, 2400], { domTarget: window })
    const slider = useRef()
    
    // global scene params
    useEffect(() => {
        camera.position.z = 7.4
        scene.background = new THREE.Color(0xffffff)
    })

    return (
        <>
            <ambientLight />
            <MaterialsProvider shouldPlayVideo={true}>
            {/* <a.group ref={slider} rotation-x={x.to(x=>x/2000)} rotation-y={x.to(x=>x/2000)}> */}
                <ArrienZinghiniNoiseScreen width={C.VIDEO_DIMENSIONS.x} height={C.VIDEO_DIMENSIONS.y} />
                <ArrienZinghiniFlatScreen width={C.VIDEO_DIMENSIONS.x} height={C.VIDEO_DIMENSIONS.y} />
            {/* </a.group> */}
            </MaterialsProvider>
        </>
    );
}
