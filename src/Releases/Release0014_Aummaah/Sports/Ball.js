import { useSphere } from '@react-three/cannon';
import React, { useContext, useEffect } from "react";
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
  const { accentWireframe } = useContext(MaterialsContext)
  const [ref, api] = useSphere(() => ({
    mass: mass,
    args: radius,
    velocity: velocity,
    position: position,
    material: contactMaterial,

  }))
  // useEffect(() => {
  //   if (!accentWireframe) return
  //   accentWireframe.color.set(new THREE.Color(color))
  // }, [accentWireframe])
  useEffect(() => {
    onInit()
  }, [])
  // const curVelocity = useRef([0, 0, 0])
  // useEffect(() => api.velocity.subscribe((v) => (curVelocity.current = v)), [])
  // const curPosition = useRef([0, 0, 0])
  // useEffect(() => api.position.subscribe((v) => (curPosition.current = v)), [])
  // const prevZ = useRef(curPosition.current[2])
  // useFrame(() => {
  //   if (!curVelocity.current || !curPosition.current) return
  //   // ignore if at initialization step
  //   if (curPosition.current[1] === 0) return
  //   console.log("cur y", curPosition.current[1])
  //   console.log("cur vel", curVelocity.current)
  //   console.log("reduce vel:", curVelocity.current.reduce((acc, item) => {
  //     return acc + item
  //   }, 0))
  //   const accumulatedVelocity = curVelocity.current.reduce((acc, item) => {
  //     return acc + item
  //   }, 0)
  //   const changeInZ = Math.abs(curPosition.current[2] - prevZ.current)
  //   prevZ.current = curPosition.current[2]
  //   if (
  //     // ball is less than original y  (to avoid val when initialized, at 0)
  //     curPosition.current[1] < position[1] &&
  //     // change in z
  //     changeInZ < .01

  //     ){
  //     // and velocity is 0
  //     // Math.abs(accumulatedVelocity) < 0.0001) {
  //     // console.log("RESET GAME")
  //     // setGameIsOn(false)
  //     // setTimeout(() => {
  //     //   setGameIsOn(true)
  //     // }, 2000);
  //     api.position.set(position)
  //   }
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
