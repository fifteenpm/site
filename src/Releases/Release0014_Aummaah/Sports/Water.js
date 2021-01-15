// import React, { useEffect, useRef, useState } from 'react'
// import { createPortal, extend, useFrame, useThree } from 'react-three-fiber'
// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
// import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
// // import { WaterPass } from '../../resources/postprocessing/WaterPass'
// import { WaterPass } from './WaterPass'
// extend({ OrbitControls, EffectComposer, ShaderPass, RenderPass, WaterPass })

import { usePlane } from '@react-three/cannon';
import React, { useEffect, useContext } from "react";
import { MaterialsContext } from '../MaterialsContext';
import * as THREE from 'three'
import ParametricCloth from './ParametricCloth'

export default function Water({ color, material, ...props }) {
  const [ref] = usePlane(() => ({
    mass: 0,
    ...props,
  }));
  const { waterMaterial } = useContext(MaterialsContext)
  // useEffect(() => {
  //   if (!wireframe) return;
  //   wireframe.color.set(new THREE.Color(color))
  // }, [wireframe])
  // console.log("WATER MATERIAL!", waterMaterial)
  return (
    // <ParametricCloth material={wireframe} {...props} />
    <mesh receiveShadow ref={ref} material={waterMaterial}>
      <planeBufferGeometry attach="geometry" args={[100, 100, 100, 100]} />
    </mesh>
  );
}


// export default function Water({ }) {
//   const [scene] = useState(() => new THREE.Scene())
//   // const {scene}
//   const composer = useRef()
//   const { scene, gl, size, camera } = useThree()
//   useEffect(() => void composer.current.setSize(size.width, size.height), [size.width, size.height])
//   useFrame(({ gl }) => void ((gl.autoClear = true), composer.current.render()), 1)
  
//   return createPortal(
//     <>
//       <effectComposer ref={composer} args={[gl]}>
//         {scene && (
//           <>
//             <renderPass attachArray="passes" scene={scene} camera={camera} />
//             <waterPass attachArray="passes" factor={2} />
//             <shaderPass
//               attachArray="passes"
//               args={[FXAAShader]}
//               material-uniforms-resolution-value={[1 / size.width, 1 / size.height]}
//               renderToScreen
//             />
//           </>
//         )}
//       </effectComposer>
//       {/* <ambientLight /> */}
//       {/* <spotLight position={[100, 10, 10]} /> */}
//       <mesh>
//         <boxBufferGeometry attach="geometry" args={[100, 100, 2]} />
//         <meshStandardMaterial attach="material" color="lightgreen" />
//       </mesh>
//     </>,
//     scene
//   )
// }
