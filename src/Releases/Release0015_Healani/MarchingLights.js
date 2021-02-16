import React, { useRef, useEffect, useCallback } from "react";
import { useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";
import lerp from "lerp";
import { MarchingCubes } from "three/examples/jsm/objects/MarchingCubes";
import { useTrail, animated } from 'react-spring'

import { CUBES, BACK, FRONT, LIGHTS } from "./utils";

// function Goo() {
//   const [trail, set] = useTrail(
//     3, 
//     () => ({ 
//       xy: [0, 0], 
//       config: i => (i === 0 ? fast : slow) 
//     })
//   )
//   return (
//     <>
//       <svg style={{ position: 'absolute', width: 0, height: 0 }}>
//         <filter id="goo">
//           <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" />
//           <feColorMatrix in="blur" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7" />
//         </filter>
//       </svg>
//       <div className="hooks-main" onMouseMove={e => set({ xy: [e.clientX, e.clientY] })}>
//         {trail.map((props, index) => (
//           <animated.div key={index} style={{ transform: props.xy.interpolate(trans) }} />
//         ))}
//       </div>
//     </>
//   )
// }


function MarchingLights(props) {
  const { blobRef } = props;

  const { scene } = useThree();

  const ref = useRef();
  const lightsRef = useRef();

  const numblobs = LIGHTS.length;
  const subtract = 12;
  const strength = 1.2 / ((Math.sqrt(numblobs) - 1) / 4 + 1);

  const init = useCallback(
    function init() {
      ref.current = new MarchingCubes(
        64,
        new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(CUBES),
          emissive: new THREE.Color(BACK),
          emissiveIntensity: 0.05,

          metalness: 0,
          roughness: 0.01,

          side: THREE.DoubleSide
        }),
        false,
        false
      );

      scene.add(ref.current);

      return () => scene.remove(ref.current);
    },
    [ref, scene]
  );

  const onFrame = useCallback(
    function onFrame({ clock }) {
      const time = clock.getElapsedTime();

      ref.current.rotation.x = lerp(ref.current.rotation.x, time / 10, 0.2);
      ref.current.rotation.y = lerp(ref.current.rotation.y, time / 10, 0.2);
      ref.current.rotation.z = lerp(ref.current.rotation.z, time / 10, 0.2);

      if (ref.current) {
        ref.current.reset();

        ref.current.scale.copy(blobRef.current.scale).addScalar(2);
        ref.current.position.copy(blobRef.current.position);

        lightsRef.current.position.set(
          ref.current.position.x,
          ref.current.position.y,
          ref.current.position.z
        );
        lightsRef.current.rotation.set(
          ref.current.rotation.x,
          ref.current.rotation.y,
          ref.current.rotation.z
        );

        for (let i = 0; i < numblobs; i++) {
          const x = Math.sin(
            i + time * (1 + 0.5 * Math.cos(((2 * Math.PI) / 3) * i))
          );
          const z = Math.cos(
            i + time * (1 + 0.5 * Math.cos(((2 * Math.PI) / 3) * i))
          );
          const y = Math.sin(
            i + time * (1 + 0.5 * Math.cos(((2 * Math.PI) / 3) * i))
          );

          const ballx = x * 0.3 + 0.9;
          const ballz = z * 0.3 + 0.9;
          const bally = y * 0.3 + 0.9;
          ref.current.addBall(ballx, bally, ballz, strength, subtract);

          const lightx = x * 104 + 1.5;
          const lightz = z * 104 + 1.5;
          const lighty = y * 104 + 1.5;
          lightsRef.current.children[i].position.set(lightx, lighty, lightz);
        }
      }
    },
    [ref, lightsRef, blobRef, numblobs, strength]
  );

  useEffect(() => {
    init();
  }, [init]);

  useFrame(onFrame);

  // const fast = { tension: 1200, friction: 40 }
  // const slow = { mass: 10, tension: 200, friction: 50 }
  // const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`
  // const [trail, set] = useTrail(
  //   3, 
  //   () => ({ 
  //     xy: [0, 0], 
  //     config: i => (i === 0 ? fast : slow) 
  //   })
  // )

  return (
    <group ref={lightsRef} onMouseMove={e => set({ xy: [e.clientX, e.clientY] })}>
      {LIGHTS.map(({ id, color }) => (
        <pointLight
          key={id}
          intensity={1}
          color={new THREE.Color(color)}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
      ))}      
    </group>
  );
}

export default MarchingLights;
