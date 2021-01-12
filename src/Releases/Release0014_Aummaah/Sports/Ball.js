import { useSphere } from '@react-three/cannon';
import React, { useEffect } from "react";


export default function Ball({ onInit, contactMaterial, mass = 1, radius = 0.5, velocity = [0, 5, 0], position = [0, 0, 0] }) {
    const [ref, api] = useSphere(() => ({
      mass: mass,
      args: radius,
      velocity: velocity,
      position: position,
      material: contactMaterial,
      onCollide: (e) => {
        console.log("BALL COLLIDE:", e)
      }
    }))
  
    useEffect(() => {
      onInit()
    }, [])
  
    return (
      <mesh castShadow ref={ref} onClick={e => {
        console.log('forceful!')
        api.applyImpulse([10, 30, 0], [0, 0, 0])
      }}>
        <sphereBufferGeometry attach="geometry" args={[radius, 64, 64]} />
        <meshStandardMaterial attach="material" color="white" />
      </mesh>
    )
  }
  