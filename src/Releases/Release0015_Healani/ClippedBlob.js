import React, { useRef, useCallback } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";

import { BACK, VERTICES_NUM, easeInOutQuad } from "./utils";

function ClippedBlob(props) {
  const { position, scale } = props;

  const ref = useRef();

  const onFrame = useCallback(
    function onFrame({ clock }) {
      const time = clock.getElapsedTime() / 25;

      ref.current.rotation.x += time / 5000;
      ref.current.rotation.y += time / 5000;
      ref.current.rotation.z += time / 5000;

      for (let i = 0; i < ref.current.geometry.vertices.length; i++) {
        const p = ref.current.geometry.vertices[i];
        p.normalize().multiplyScalar(
          1 +
            0.3 *
              easeInOutQuad(Math.sin(2 * Math.PI * time)) //*
              // window.noise.perlin3(
              //   p.x + time,
              //   p.y + time,
              //   p.z + time
              // )
        );
      }
      ref.current.geometry.computeVertexNormals();
      ref.current.geometry.normalsNeedUpdate = true;
      ref.current.geometry.verticesNeedUpdate = true;
    },
    [ref]
  );

  useFrame(onFrame);

  const clippingPlanes = [new THREE.Plane(new THREE.Vector3(0, 0, 0), 2)];

  return (
    <>
      <mesh ref={ref} scale={scale} position={position} receiveShadow>
        <sphereGeometry
          attach="geometry"
          args={[2, VERTICES_NUM, VERTICES_NUM]}
        />

        <meshPhysicalMaterial
          attach="material"
          side={THREE.DoubleSide}
          clippingPlanes={clippingPlanes}
          clipShadows
          metalness={2}
          roughness={0.1}
          color={new THREE.Color(BACK)}
          specular={new THREE.Color(BACK)}
          emissive={new THREE.Color(BACK)}
          emissiveIntensity={0.9}
        />
      </mesh>
    </>
  );
}

export default ClippedBlob;
