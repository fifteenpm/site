import { useSphere } from '@react-three/cannon';
import React, { useContext, useEffect, useRef } from "react";
import { useFrame } from 'react-three-fiber'
import * as THREE from 'three';
import { MaterialsContext } from '../MaterialsContext';
import { useStore } from "./hooks.js";

export default function Ball({
  onInit,
  color = "white",
  contactMaterial,
  mass = 1,
  radius = 0.5,
  velocity = [0, 5, 0],
  position = [0, 0, 0]
}) {
  const { setGameIsOn } = useStore(state => state.api)
  const gameIsOn = useStore(state => state.gameIsOn)
  // const setBallPosition = useStore(state => state.setBallPosition)

  const { accentWireframe } = useContext(MaterialsContext)
  const [ref, api] = useSphere(() => ({
    mass: mass,
    args: radius,
    velocity: velocity,
    position: position,
    material: contactMaterial,

  }))
  // const curPosition = useRef([0, 0, 0])

  useEffect(() => {
    onInit()
  }, [])

  // useEffect(() => {api.position.subscribe((p) => (curPosition.current = p))})

  // useFrame(() => {
  //   if (!curPosition.current) return
  //   setBallPosition({x: curPosition.current[0], y: curPosition.current[1], z: curPosition.current[2]})
  // })

  function applyImpulse() {
    api.applyImpulse([10, 30, 0], [0, 0, 0])
  }
  return (
    <mesh castShadow ref={ref} onClick={e => applyImpulse()} material={accentWireframe}>
      <sphereBufferGeometry attach="geometry" args={[radius, 12, 12]} />
    </mesh>
  )
}
