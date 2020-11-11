import React, { useEffect } from 'react';
import {useFrame, useThree} from 'react-three-fiber';
import Sports from './Sports/Sports.js'
import Glitchy from './glitchy/index.js'
import Orbit from '../../Common/Controls/Orbit';
import Flying from '../../Common/Controls/Flying'
import { MaterialsProvider } from './MaterialsContext.js';

// crazy glitch 778e1868d6e437efd56591ac910226644d883c0f
// flat tiling a76fc468aae5e1d690c87a9935a71a797c1ae8a2

export function Scene({ }) {
    const {camera} = useThree()
    useEffect(() => {
        console.log(camera.position)
        camera.position.set(0,.1,5)
        // camera.lookAt(0, 0, 0)
    }, [])
    useFrame(() => {
        camera.position.z -= .01
        // console.log('cam pos', camera.position)
    })
    return <>
        {/* <Orbit autoRotate={false} /> */}
        <ambientLight />
        <MaterialsProvider>
            <Sports />
        </MaterialsProvider>
    </>
}
