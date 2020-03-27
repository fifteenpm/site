import React, { useRef } from "react";
import { extend, useFrame, useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { FlyControls } from "three/examples/jsm/controls/FlyControls";
// import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import { isMobile } from "../../Common/Utils/BrowserDetection";

extend({ OrbitControls});

export function Controls({ curCamera, ...props }) {
  curCamera = curCamera || useThree().camera;
  const controls = useRef();
  const { gl } = useThree();
  const delta = 0.001;
  
  // control setting
  // controls.lookSpeed = 0.065;
  // controls.movementSpeed = 66;
  // controls.enabled = true;
  // controls.mouseMotionActive = false;

  useFrame(() => {
    controls.current && controls.current.update(delta);
  });
  return (
    <orbitControls
      ref={controls}
      args={[curCamera, gl.domElement]}
      enableKeys={true}
      enanbleZoom={false}
      minPolarAngle={Math.PI / 2.1}
      maxPolarAngle={ Math.PI /2.5}
      keyPanSpeed={21.0}
      {...props}
    />
  );
}
