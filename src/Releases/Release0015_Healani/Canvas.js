import React, { Suspense, useRef } from 'react';
import { Canvas, extend, useFrame, useThree } from 'react-three-fiber';
import { AudioPlayerContext } from '../../Common/UI/Player/AudioPlayerContext';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Effects from "./Effects";
import ClippedBlob from "./ClippedBlob";
import Blob from "./Blob";
import { BACK, IS_MOBILE } from "./utils";

import "./styles.css";
import './perlin.js';

extend({ OrbitControls });

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

export default function HealaniCanvas({ hasEnteredWorld }) {
    return (
        // Unfortunately some gymnastics required here to pass music player context through canvas.
        // There's more than one way to solve this and some room for clean-up but this does the job.
        // https://github.com/konvajs/react-konva/issues/188#issuecomment-478302062
        // https://github.com/react-spring/react-three-fiber/issues/114
        <AudioPlayerContext.Consumer>
            {
                value => (
                  <Canvas
                    shadowMap
                    pixelRatio={Math.min(2, IS_MOBILE ? window.devicePixelRatio : 1)}
                    camera={{
                      position: [0, 0, 50],
                      near: 5,
                      far: 1000,
                      rotation: [0, 0, 0],
                      fov: 45
                    }}
                    onCreated={({ gl }) => {
                      gl.localClippingEnabled = true;
                      gl.setClearColor(new THREE.Color(BACK));
                      gl.toneMapping = THREE.ACESFilmicToneMapping;
                    }}
                  >
                    <ambientLight intensity={0.3} />
                    <AudioPlayerContext.Provider value={value}>
                      <Suspense fallback={null}>
                        <Blob position={[0, 0, 10]} scale={[10, 10, 10]} />
                        <ClippedBlob position={[0, 0, -25]} scale={[20, 20, 20]} />
                      </Suspense>
                    </AudioPlayerContext.Provider>
                    <Effects />
                  </Canvas>
                )}
        </AudioPlayerContext.Consumer>
    )
}

