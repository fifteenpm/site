import { useBox, usePointToPointConstraint, useSphere } from '@react-three/cannon';
import React, { useContext, useMemo, useRef } from "react";
import { useFrame } from 'react-three-fiber';
import { MaterialsContext } from '../MaterialsContext';
import { useDragConstraint } from './hooks.js';
import { randVal } from './utils';

export const Lamp = ({color = "orange", pointIntensity=.01, spotIntensity=.05}) => {
  const { naiveGlass } = useContext(MaterialsContext)
  const light = useRef()
  const position = useMemo(() => [0, 10, -10])
  const [fixed, fixedAPI] = useSphere(() => ({ type: 'Static', args: 1, position: position }))
  const [lamp, lampAPI] = useBox(() => ({ mass: 1, args: [1, 0, 5, 1], linearDamping: 0.9, position: position }))
  usePointToPointConstraint(fixed, lamp, { pivotA: [0, 0, 0], pivotB: [0, 2, 0] })
  const bind = useDragConstraint(lamp)
  const impulseOptions = useMemo(() => [0, .1, .2, -.1, -.2])
  useFrame(({ clock }) => {
    if (Math.floor(clock.elapsedTime) % 3 == 0) {
      lampAPI.applyLocalImpulse([randVal(impulseOptions), randVal(impulseOptions), randVal(impulseOptions)], [0, 0, 0])
    }
  })
  return (
    <>
      <mesh ref={lamp} {...bind}
        onClick={() => {
          // make the lamp move around
          lampAPI.applyLocalImpulse([1, 1, -8], [0, 0, 0])
        }}
        material={naiveGlass}
      >
        <coneBufferGeometry attach="geometry" args={[2, 2.5, 32]} />
        <pointLight intensity={pointIntensity} distance={5} color={color} />
        <spotLight ref={light} color={color} position={[0, 20, 0]} angle={0.4} penumbra={1} intensity={spotIntensity} castShadow />
      </mesh>
    </>
  )
}
