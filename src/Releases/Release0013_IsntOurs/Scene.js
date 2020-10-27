import ReactDOM from 'react-dom'
import React, { useMemo, useRef, useEffect, useContext, useState, Suspense } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from 'react-three-fiber';
import { MaterialsProvider } from './MaterialsContext';
import ArrienZinghiniNoiseScreen from './ArrienZinghiniNoiseScreen';
import ArrienZinghiniFlatScreen from './ArrienZinghiniFlatScreen';
import ArrienZinghiniSphereScreen from './ArrienZinghiniSphereScreen';
import EncompassingSphere from './EncompassingSphere';
import ArrienZinghiniCurvedScreen from './ArrienZinghiniCurvedScreen';
import * as C from './constants';
import Orbit from '../../Common/Controls/Orbit';
import Flying from '../../Common/Controls/Flying';
import useVideoPlayer from '../../Common/UI/Player/hooks/useVideoPlayer';
import useYScroll from '../../Common/Scroll/useYScroll';
import { a } from '@react-spring/three'
import Stars from '../../Common/Utils/Stars'

export function Scene({ shouldPlayVideo, yScrollNumerator = 3 }) {
    const { scene } = useThree();
    const [yScrollRange, setYScrollRange] = useState(window.innerWidth * yScrollNumerator)
    const [yScrollDenominator, setYScrollDenominator] = useState(window.innerWidth / yScrollNumerator)
    const { playTrack, isPlaying, videoElement } = useVideoPlayer();
    useEffect(() => {
        setYScrollRange(window.innerWidth * yScrollNumerator)
        setYScrollDenominator(window.innerWidth / yScrollNumerator)
    }, [window.innerWidth])
    // global scene params
    useEffect(() => {
        scene.background = new THREE.Color(0x000000)
    }, [])

    useEffect(() => {
        if (shouldPlayVideo && !isPlaying) {
            playTrack(0)
        }
    }, [shouldPlayVideo, isPlaying])
    const [ys] = useYScroll([-yScrollRange, yScrollRange], { domTarget: window });
    return (
        <>
            <Stars />
            <MaterialsProvider shouldPlayVideo={shouldPlayVideo}>
                <Suspense fallback={null}>
                    <a.group rotation-y={ys.to(ys => ys / yScrollDenominator)}>
                        <ArrienZinghiniCurvedScreen width={C.VIDEO_DIMENSIONS.x} height={C.VIDEO_DIMENSIONS.y} />
                    </a.group>
                </Suspense>
            </MaterialsProvider>
        </>
    );
}


