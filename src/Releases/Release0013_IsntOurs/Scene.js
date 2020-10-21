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


export function Scene({ shouldPlayVideo }) {
    const { camera, scene } = useThree();
    const [videoLoaded, setVideoLoaded] = useState(false)
    const orbit = useRef()
    // global scene params
    useEffect(() => {
        // camera.position.z = 7.4
        camera.position.z = 0.2
        console.log("CAM", camera)
        scene.background = new THREE.Color(0xfff)
    }, [])
    const { playTrack, isPlaying } = useVideoPlayer();

    useEffect(() => {
        console.log("iPlaying (in Scene, from hook): ", isPlaying)
    }, [isPlaying])

    useEffect(() => {
        
        if (shouldPlayVideo && !isPlaying) {
            playTrack(0)
        }
    }, [shouldPlayVideo, isPlaying])
    // const curvedScreen = useRef();
    const [ys] = useYScroll([-4800, 4800], { domTarget: window });
    return (
        <>
            {/* <Orbit
                maxDistance={3.5}
                minDistance={.5}
                
            // autoRotate={true}
            // target={curvedScreen.current ? curvedScreen.current.position : new THREE.Vector3(0, 0, 0)}
            /> */}
            {/* <pointLight intensity={.00001} position={[10, 10, 10]} /> */}
            {/* <ambientLight color={0x800080} intensity={.0000001} /> */}
            <MaterialsProvider
                shouldPlayVideo={shouldPlayVideo}
            >
                <Suspense fallback={null}>
                    <a.group rotation-y={ys.to(ys => ys / 300)}>
                        <ArrienZinghiniCurvedScreen width={C.VIDEO_DIMENSIONS.x} height={C.VIDEO_DIMENSIONS.y} />
                        {/* <EncompassingSphere radius={C.VIDEO_DIMENSIONS.x * 10} height={C.VIDEO_DIMENSIONS.y} /> */}
                    </a.group>
                </Suspense>
            </MaterialsProvider>
        </>
    );
}


