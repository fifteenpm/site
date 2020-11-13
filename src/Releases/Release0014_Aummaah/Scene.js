import React, { Suspense, useEffect } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import Orbit from '../../Common/Controls/Orbit';
import Flying from '../../Common/Controls/Flying';
import FirstPerson from '../../Common/Controls/FirstPerson';
import { MaterialsProvider } from './MaterialsContext.js';
import Sports from './Sports/Sports.js';
// crazy glitch 778e1868d6e437efd56591ac910226644d883c0f
// flat tiling a76fc468aae5e1d690c87a9935a71a797c1ae8a2
import { BloomFilmEffect } from '../../Common/Effects/Effects'

export function Scene({ }) {
    const { camera, raycaster,gl } = useThree()
    useEffect(() => {
        // hack to get physics to work :(
        gl.xr = {isPresenting: false}
        camera.lookAt(0, 1, 0)
        camera.rotation.x = -2
        camera.position.y = .9
    }, [])
    useFrame(() => {
        // DEL ME (devving)
        camera.far = 99999
        // console.log(camera.rotation)
        // this was the rotation that looked good:
        // _x: -1.2632205015650546
        // _y: -0.02564309799712867
        // _z: -0.08054237130475483
        // fly forward thru the scene
        // // camera.position.z -= .01
        // camera.position.set(camera.position.x, THREE.Math.clamp(camera.position.y, .75, .8), camera.position.z)
        // camera.rotation.set(
        //     THREE.Math.clamp(camera.rotation.x, -1.3, -1.1),
        //     THREE.Math.clamp(camera.rotation.y, -.05, .05),
        //     THREE.Math.clamp(camera.rotation.z, -.05, .05),
        // )
    })
    return <>
        {/* <Flying /> */}
        {/* <Orbit autoRotate={false}/> */}
        <FirstPerson />
        {/* <FirstPerson autoRotate={false} heightMax={.1} heightMin={.1} heightSpeed={true} heightCoefficient={-1} /> */}
        <ambientLight />
        <BloomFilmEffect />
        <MaterialsProvider>
            <Suspense fallback={null}>
                <Sports />
            </Suspense>
        </MaterialsProvider>
    </>
}
