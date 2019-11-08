import React, { useState, useMemo, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree, extend } from 'react-three-fiber';
import { FirstPersonControls } from 'three-full';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { isMobile } from '../../../Utils/BrowserDetection';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

extend({ OrbitControls, FlyControls, PointerLockControls });

export default function DashCam({ }) {
    const ref = useRef()
    const { gl, mouse, aspect, size, setDefaultCamera } = useThree();
    const [touching, setTouching] = useState(false);
    useEffect(() => {
        window.addEventListener("touchmove", touchLook, false);
        window.addEventListener("touchend", () => setTouching(false), false);
    })

    const [euler, PI_7, PI_11, PI_24] = useMemo(() => [new THREE.Euler(0, 0, 0, 'YXZ'), Math.PI / 7, Math.PI / 11, Math.PI / 24])

    const touchLook = (event) => {
        if (!ref.current) return;
        if (!touching) setTouching(true);
        var movementX = (event.touches[0].clientX - window.innerWidth / 2) || 0;
        var movementY = (event.touches[0].clientY - window.innerHeight / 2) || 0;
        euler.setFromQuaternion(ref.current.quaternion);
        euler.x -= movementY * 0.00005;
        euler.y -= movementX * 0.00005;
        euler.y = Math.max(- PI_11, Math.min(PI_11, euler.y));
        euler.x = Math.max(- PI_24, Math.min(PI_7, euler.x));
        ref.current.quaternion.setFromEuler(euler);
    }

    // revert back to rotation 0 on mobile if no touch action
    useFrame(() => {
        if (!isMobile || touching) return;
        if (ref.current.rotation.y > 0) {
            ref.current.rotation.y -= .1;
        }
        if (ref.current.rotation.y < 0) {
            ref.current.rotation.y += .1;
        }
        if (ref.current.rotation.x > 0) {
            ref.current.rotation.x -= .1;
        }
        if (ref.current.rotation.x < 0) {
            ref.current.rotation.x += .1;
        }
    })

    // TODO limit look down on desktop -- might just want to write own look function and remove pointer lock controls

    // Make the camera known to the system
    useEffect(() => {
        ref.current.aspect = aspect;
        ref.current.updateMatrixWorld()
        setDefaultCamera(ref.current);
    }, [])
    // Update it every frame
    useFrame(() => ref.current.updateMatrixWorld())
    const controls = useRef();
    return <>
        <perspectiveCamera
            ref={ref}
            aspect={size.width / size.height}
            radius={(size.width + size.height) / 4}
            fov={55}
            near={.01}
            position={[0, .068, .15]}
            onUpdate={self => self.updateProjectionMatrix()}
        />
        {ref.current &&
            <pointerLockControls
                ref={controls}
                args={[ref.current, gl.domElement]}
                isLocked={true} />
        }
    </>
}
