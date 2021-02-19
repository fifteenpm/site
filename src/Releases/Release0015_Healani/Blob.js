import React, { useRef, useCallback,useState, useEffect } from "react";
import { useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";
import { useDrag, useHover } from "react-use-gesture";
import { useSpring, a } from "react-spring/three";

import MarchingLights from "./MarchingLights";
import { BACK, VERTICES_NUM, easeInOutQuad } from "./utils";


function Blob(props) {
  const { position, scale } = props;

  const ref = useRef();
  const hoverRef = useRef(false);

  const initialScale = scale.map((x) => x / 2  );

  const { aspect } = useThree();

  const [spring, set] = useSpring(() => ({
    scale: initialScale,
    position,
    config: { mass: 10, friction: 50, tension: 900 }
  }));

const fast = { tension: 1200, friction: 40 }
const slow = { mass: 10, tension: 200, friction: 50 }
const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`

const bindDrag = useDrag(
  ({ offset: [x, y], down }) =>
    set({
      position: [(0.05 * x) / aspect, -(0.05 * y) / aspect, position[2]]
    }),
  { pointerEvents: true }
);

const bindHover = useHover(
  ({ hovering }) => {
    hoverRef.current = hovering;
    set({ scale: initialScale });
  },
  {
    pointerEvents: true
  }
);

  const onFrame = useCallback(function onFrame({ clock }) {
    const time = clock.getElapsedTime();

    ref.current.rotation.x += time / 500;
    ref.current.rotation.y += time / 500;
    ref.current.rotation.z += time / 500;

    const noiseFactor = hoverRef.current ? 3 : 0;

    for (let i = 0; i < ref.current.geometry.vertices.length; i++) {
      const p = ref.current.geometry.vertices[i];

      p.normalize().multiplyScalar(
        1 +
          0.3 *
            easeInOutQuad(
              hoverRef.current ? 1 : Math.sin((2 * Math.PI * time) / 10)
            ) *
            window.noise.perlin3(
              p.x * noiseFactor + time,
              p.y * noiseFactor + time,
              p.z * noiseFactor + time
            )
      );
    }
    
    ref.current.geometry.computeVertexNormals();
    ref.current.geometry.normalsNeedUpdate = true;
    ref.current.geometry.verticesNeedUpdate = true;
  }, []);

  useFrame(onFrame);

  return (
    <>
      <MarchingLights blobRef={ref} />
      <a.mesh
        ref={ref}
        scale={scale}
        {...spring}
        {...bindDrag()}
        {...bindHover()}
        receiveShadow
      >
        <sphereGeometry
          attach="geometry"
          args={[1, VERTICES_NUM, VERTICES_NUM]}
        />
        <meshPhysicalMaterial
          attach="material"
          side={THREE.BackSide}
          clipShadows
          metalness={2}
          roughness={0.1}
          color={new THREE.Color(BACK)}
          specular={new THREE.Color(BACK)}
          emissive={new THREE.Color(BACK)}
          emissiveIntensity={0.9}
        />
      </a.mesh>
    </>
  );
}

export default Blob;
