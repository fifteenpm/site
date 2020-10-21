import ReactDOM from 'react-dom'
import React, { useMemo, useRef, useEffect, useContext, useState, Suspense } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from 'react-three-fiber';
import { MaterialsProvider } from './MaterialsContext';
import ArrienZinghiniNoiseScreen from './ArrienZinghiniNoiseScreen';
import ArrienZinghiniFlatScreen from './ArrienZinghiniFlatScreen';
import ArrienZinghiniSphereScreen from './ArrienZinghiniSphereScreen';
import ArrienZinghiniCurvedScreen from './ArrienZinghiniCurvedScreen';
import * as C from './constants';
import Orbit from '../../Common/Controls/Orbit';
import Flying from '../../Common/Controls/Flying';
import useVideoPlayer from '../../Common/UI/Player/hooks/useVideoPlayer';

function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()

    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))
    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            onClick={(e) => setActive(!active)}
            onPointerOver={(e) => setHover(true)}
            onPointerOut={(e) => setHover(false)}>
            <boxBufferGeometry attach="geometry" args={[5, 1, 1]} />
            <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} side={THREE.DoubleSide} />
        </mesh>
    )
}

export function Scene({ shouldPlayVideo }) {
    const { camera, scene } = useThree();
    const [videoLoaded, setVideoLoaded] = useState(false)
    const orbit = useRef()
    // global scene params
    useEffect(() => {
        // camera.position.z = 7.4
        camera.position.z = 17.4
        scene.background = new THREE.Color(0xffffff)
    }, [])
    const { playTrack, isPlaying } = useVideoPlayer();

    useEffect(() => {
        console.log("iPlaying (in Scene, from hook): ", isPlaying)
    }, [isPlaying])

    useEffect(() => {

        if (shouldPlayVideo && !isPlaying) {

            playTrack(0)
            console.log('triggering play in scene// isPlaying?', isPlaying)
        }
    }, [shouldPlayVideo, isPlaying])

    // console.log("VIDEO TEXTURE IN SCENE", videoTexture)
    return (
        <>
            {/* <Orbit /> */}
            {/* <Flying /> */}
            {/* <pointLight position={[10, 10, 10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
            <ambientLight /> */}
            {/* <Orbit autoRotate={true} /> */}

            <MaterialsProvider
                shouldPlayVideo={shouldPlayVideo}
            >
                <Suspense fallback={null}>
                    {/* <ArrienZinghiniNoiseScreen width={C.VIDEO_DIMENSIONS.x} height={C.VIDEO_DIMENSIONS.y} /> */}
                    <ArrienZinghiniCurvedScreen width={C.VIDEO_DIMENSIONS.x} height={C.VIDEO_DIMENSIONS.y} />
                    {/* {shouldPlayVideo && <ArrienZinghiniFlatScreen width={C.VIDEO_DIMENSIONS.x} height={C.VIDEO_DIMENSIONS.y} />} */}
                    {/* <ArrienZinghiniSphereScreen width={C.VIDEO_DIMENSIONS.x} height={C.VIDEO_DIMENSIONS.y} /> */}
                </Suspense>
            </MaterialsProvider>
        </>
    );
}


