import { a } from '@react-spring/three';
import React, { Suspense, useEffect, useState } from 'react';
import { useThree } from 'react-three-fiber';
import * as THREE from 'three';
import useYScroll from '../../Common/Scroll/useYScroll';
import useVideoPlayer from '../../Common/UI/Player/hooks/useVideoPlayer';
import { isMobile } from '../../Common/Utils/BrowserDetection';
import Stars from '../../Common/Utils/Stars';
import ArrienZinghiniCurvedScreen from './ArrienZinghiniCurvedScreen';
import * as C from './constants';
import { MaterialsProvider } from './MaterialsContext';
import Orbit from '../../Common/Controls/Orbit'

export function Scene({ shouldPlayVideo, yScrollNumerator = isMobile ? 6 : 3 }) {
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
            <Stars radius={1}/>
            <Orbit
                autoRotate={true}
                autoRotateSpeed={1.}
                enableDamping={true}
                dampingFactor={1}
                enableZoom={false}
            />
            <pointLight intensity={100}/>
            <MaterialsProvider shouldPlayVideo={shouldPlayVideo}>
                <Suspense fallback={null}>
                    {/* // TODO (jeremy) add touchAction: 'none' to a.group? */}
                    {/* // https://github.com/pmndrs/react-use-gesture */}
                    <group>
                        <ArrienZinghiniCurvedScreen width={C.VIDEO_DIMENSIONS.x} height={C.VIDEO_DIMENSIONS.y} />
                    </group>
                </Suspense>
            </MaterialsProvider>
        </>
    );
}

// style={{touchAction: 'none'}}


