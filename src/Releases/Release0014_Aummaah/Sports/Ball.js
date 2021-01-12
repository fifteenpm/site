import { useSphere } from '@react-three/cannon';
import React, { useEffect, useRef } from "react";
import { useFrame } from 'react-three-fiber';

export default function Ball({ onInit, contactMaterial, mass = 1, radius = 0.5, velocity = [0, 5, 0], position = [0, 0, 0] }) {
  const [ref, api] = useSphere(() => ({
    mass: mass,
    args: radius,
    velocity: velocity,
    position: position,
    material: contactMaterial,
    onCollide: (e) => {
    }
  }))

  useEffect(() => {
    onInit()
  }, [])


  // const velocitySubscription = useRef([0, 0, 0])
  // useEffect(() => api.velocity.subscribe((v) => (velocitySubscription.current = v)), [])
  
  // useFrame(() => {
  //   console.log("velocity", velocitySubscription.current)
  // })
  return (
    <mesh castShadow ref={ref} onClick={e => {
      api.applyImpulse([10, 30, 0], [0, 0, 0])
    }}>
      <sphereBufferGeometry attach="geometry" args={[radius, 64, 64]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  )
}
