import React, {useMemo} from "react";
import * as THREE from 'three';

export const Box = React.forwardRef(({ material, children, transparent = false, opacity = 1, color = 'white', args = [1, 1, 1], ...props }, ref) => {
  const defaultMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial(
      {
        color: color,
        transparent: transparent,
        opacity: opacity,
      }
    )
  })
  return (
    <mesh receiveShadow castShadow ref={ref} material={material ? material : defaultMaterial} {...props}>
      <boxBufferGeometry attach="geometry" args={args} />
      {/* <meshStandardMaterial attach="material" color={color} transparent={transparent} opacity={opacity} /> */}
      {children}
    </mesh>
  )
})
