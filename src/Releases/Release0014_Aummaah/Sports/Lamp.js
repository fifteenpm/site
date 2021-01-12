import { useBox, usePointToPointConstraint, useSphere } from '@react-three/cannon';
import React, { useMemo, useRef } from "react";
import { useDragConstraint } from './hooks.js';

export const Lamp = () => {
    const light = useRef()
    const position = useMemo(() => [0, 25, 0])
    const [fixed] = useSphere(() => ({ type: 'Static', args: 1, position: position }))
    const [lamp] = useBox(() => ({ mass: 1, args: [1, 0, 5, 1], linearDamping: 0.9, position: position }))
    usePointToPointConstraint(fixed, lamp, { pivotA: [0, 0, 0], pivotB: [0, 2, 0] })
    const bind = useDragConstraint(lamp)
    return (
      <>
        <mesh ref={lamp} {...bind}>
          <coneBufferGeometry attach="geometry" args={[2, 2.5, 32]} />
          <meshStandardMaterial attach="material" />
          <pointLight intensity={1} distance={5} />
          <spotLight ref={light} color="yellow" position={[0, 20, 0]} angle={0.4} penumbra={1} intensity={0.2} castShadow />
        </mesh>
      </>
    )
  }
  