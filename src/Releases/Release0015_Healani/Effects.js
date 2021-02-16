import React, { useRef, useEffect } from "react";
import { extend, useThree, useFrame } from "react-three-fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";

extend({ EffectComposer, RenderPass });

export default function Effects() {
  const composer = useRef();
  const { scene, gl, size, camera } = useThree();

  useEffect(() => void composer.current.setSize(size.width, size.height), [
    size
  ]);

  useFrame(() => composer.current.render(), 1);

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
    </effectComposer>
  );
}
