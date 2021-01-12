import React from "react";

export const Box = React.forwardRef(({ children, transparent = false, opacity = 1, color = 'white', args = [1, 1, 1], ...props }, ref) => {
  return (
    <mesh receiveShadow castShadow ref={ref} {...props}>
      <boxBufferGeometry attach="geometry" args={args} />
      <meshStandardMaterial attach="material" color={color} transparent={transparent} opacity={opacity} />
      {children}
    </mesh>
  )
})
