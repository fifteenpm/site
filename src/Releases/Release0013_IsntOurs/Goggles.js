import React, { useContext, useRef, useEffect } from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import { MaterialsContext } from './MaterialsContext';
import Orbit from '../../Common/Controls/Orbit';

export default function Goggles({ width = 16, height = 9 }) {
    const { video } = useContext(MaterialsContext);
    const camera = useRef();
    const orbit = useRef();
    const goggles = useRef();
    const { setDefaultCamera, size, aspect } = useThree();
    // Make the camera known to the system
    useEffect(() => {
        if (!camera.current) return
        camera.current.aspect = aspect;
        camera.current.updateMatrixWorld()
        setDefaultCamera(camera.current);
        // camera.current.position.z = -1
    }, [camera])


    useFrame(() => {
        if (!camera || !orbit) return;
        // camera.current.position.set([orbit.current])
        camera.current.updateMatrixWorld()
    })

    return (
        <>
            <Orbit curCamera={camera.current} passthroughRef={orbit} />
            
            <group ref={goggles}>
                <perspectiveCamera
                    ref={camera}
                    aspect={size.width / size.height}
                    // radius={(size.width + size.height) / 4}
                    // fov={50}
                    // near={.1}
                    position={[0, 0, -5]}
                    onUpdate={self => self.updateProjectionMatrix()}
                />
                <mesh material={video} >
                    <planeBufferGeometry args={[width, height]} attach="geometry" />
                </mesh>
            </group>
        </>
    )
}
