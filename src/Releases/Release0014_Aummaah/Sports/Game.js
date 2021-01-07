// source: https://codesandbox.io/s/white-resonance-0mgum?file=/src/App.js:388-427
// react-three-fiber is a way to express threejs declaratively: https://github.com/react-spring/react-three-fiber
// use-cannon is a hook around the cannon.js physics library: https://github.com/react-spring/use-cannon
import { Physics, useBox, useCylinder, useSphere, usePlane, useConeTwistConstraint, usePointToPointConstraint, useSpring } from '@react-three/cannon';
import clamp from "lodash-es/clamp";
import React, { useMemo, createRef, Suspense, useCallback, useContext, useEffect, useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// zustand is a minimal state-manager: https://github.com/react-spring/zustand
import create from "zustand";
import * as C from '../constants.js';
import { MaterialsContext } from '../MaterialsContext';
import earthImg from "./resources/cross.jpg";
import pingSound from "./resources/ping.mp3";
import Text from "./Text";
import Court from './TennisCourt'
import useAudioPlayer from '../../../Common/UI/Player/hooks/useAudioPlayer'

// import TennisCourt from './TennisCourt';
// https://github.com/mattdesl/lerp/blob/master/index.js
function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t
}

const cursor = createRef()
// https://codesandbox.io/s/use-cannon-ragdolls-skhf8?file=/src/index.js:631-1048
function useDragConstraint(child) {
  const [, , api] = usePointToPointConstraint(cursor, child, { pivotA: [0, 0, 0], pivotB: [0, 0, 0] })
  useEffect(() => void api.disable(), [])
  const onPointerUp = useCallback(e => api.disable(), [])
  const onPointerDown = useCallback(e => {
    e.stopPropagation()
    e.target.setPointerCapture(e.pointerId)
    api.enable()
  }, [])
  return { onPointerUp, onPointerDown }
}

// Create a store ...
// const ping = new Audio(pingSound)
const [useStore] = create(set => ({
  // count: 0,
  gameIsOn: true,
  api: {

    setGameIsOn: gameIsOn => set({ gameIsOn })
    // console.log("gameIsOn set to:", gameIsOn)
  }

  // pong(velocity) {
  //   set({ startOver: false })
  //   ping.currentTime = 0
  //   ping.volume = clamp(velocity / 20, 0, 1)
  //   ping.play()
  //   if (velocity > 4) set(state => ({ count: state.count + 1 }))
  // },
  // reset: () => set({ startOver: true })
}))

// The paddle was made in blender and auto-converted to JSX by https://github.com/react-spring/gltfjsx
function Equipment() {
  const { currentTrackName, audioPlayer } = useAudioPlayer();

  return (<>
    <GolfClub />
    {/* // <group>
    //   {currentTrackName == C.AummaahTrack.Cricket && <CricketBat />}
    //   {currentTrackName == C.AummaahTrack.Tennis && <TennisRacquet />}
    //   {currentTrackName == C.AummaahTrack.Golf && <GolfClub />}
    // </group> */}
  </>
  )
}

function CricketBat({ }) {
  // Load the gltf file
  const { nodes, materials } = useLoader(GLTFLoader, C.CRICKET_BAT_GLB)
  const { greenWireframe } = useContext(MaterialsContext)
  const paddleBoxArgs = useMemo(() => [1, 1, 1])
  const model = useRef()
  // Make it a physical object that adheres to gravitation and impact
  const [ref, api] = useBox(() => ({ type: "Kinematic", args: paddleBoxArgs }))
  // use-frame allows the component to subscribe to the render-loop for frame-based actions
  let values = useRef([0, 0])
  useFrame(state => {
    // The paddle is kinematic (not subject to gravitation), we move it with the api returned by useBox
    values.current[0] = lerp(values.current[0], (state.mouse.x * Math.PI) / 5, 0.2)
    values.current[1] = lerp(values.current[1], (state.mouse.x * Math.PI) / 5, 0.2)
    api.position.set(state.mouse.x * 10, state.mouse.y * 10, -state.mouse.y * 10)
    api.rotation.set(-2 * Math.PI, 0, values.current[1])
    // Left/right mouse movement rotates it a liitle for effect only
    const modelRotationZ = state.mouse.x < -0.3 ? -Math.PI : 0;
    model.current.rotation.z = modelRotationZ;
  })


  return (
    <group>
      {/*  */}
      <mesh ref={ref} dispose={null} rotation-x={-2 * Math.PI}>
        <group ref={model}  >
          <mesh >
            <boxBufferGeometry attach="geometry" args={paddleBoxArgs} />
            <meshBasicMaterial attach="material" wireframe color="red" />
          </mesh>
          {/* <Text rotation={[-Math.PI / 2, 0, 0]} position={[0, 1, 2]} size={1} /> */}
          {/* children={count.toString()} /> */}
          <group position-x={-2} rotation={[0, -0.04, 0]} >
            <mesh castShadow receiveShadow material={greenWireframe} geometry={nodes.Mesh_0_0.geometry} />
            <mesh castShadow receiveShadow material={greenWireframe} geometry={nodes.Mesh_0_1.geometry} />
          </group>
        </group>
      </mesh>
    </group>
  )
}

function TennisRacquet({ }) {
  // Load the gltf file
  const { nodes, materials } = useLoader(GLTFLoader, C.TENNIS_RACQUET_GLB)
  const { greenWireframe } = useContext(MaterialsContext)
  const paddleBoxArgs = useMemo(() => [4, 3, 1])
  const model = useRef()
  // Make it a physical object that adheres to gravitation and impact
  const [ref, api] = useBox(() => ({ type: "Kinematic", args: paddleBoxArgs }))
  // use-frame allows the component to subscribe to the render-loop for frame-based actions
  let values = useRef([0, 0])
  useFrame(state => {
    // The paddle is kinematic (not subject to gravitation), we move it with the api returned by useBox
    // values.current[0] = lerp(values.current[0], (state.mouse.x * Math.PI) / 5, 0.2)
    values.current[1] = lerp(values.current[1], (state.mouse.x * Math.PI) / 5, 0.2)
    api.position.set(state.mouse.x * 10, state.mouse.y * 10, -state.mouse.y * 10)
    api.rotation.set(-2 * Math.PI, 0, values.current[1])
    // Left/right mouse movement rotates it a liitle for effect only
    const modelRotationZ = state.mouse.x < -0.3 ? -Math.PI : 0;
    model.current.rotation.z = modelRotationZ;
  })

  return (
    <group>
      {/*  */}
      <mesh ref={ref} dispose={null} rotation-x={-2 * Math.PI}>
        <group ref={model}  >
          <mesh >
            <boxBufferGeometry attach="geometry" args={paddleBoxArgs} />
            <meshBasicMaterial attach="material" wireframe color="red" />
          </mesh>
          {/* <Text rotation={[-Math.PI / 2, 0, 0]} position={[0, 1, 2]} size={1} /> */}
          {/* children={count.toString()} /> */}
          <group position-x={-2} rotation={[0, -0.04, 0]} >
            <mesh castShadow receiveShadow material={greenWireframe} geometry={nodes.tennisRacket_1.geometry} />
            <mesh castShadow receiveShadow material={greenWireframe} geometry={nodes.tennisRacket_2.geometry} />
            <mesh castShadow receiveShadow material={greenWireframe} geometry={nodes.tennisRacket_3.geometry} />
            <mesh castShadow receiveShadow material={greenWireframe} geometry={nodes.tennisRacket_4.geometry} />
          </group>
        </group>
      </mesh>
    </group>
  )
}

function GolfClub({ }) {
  // Load the gltf file
  const { nodes, materials } = useLoader(GLTFLoader, C.GOLF_CLUB_GLB)
  const { greenWireframe } = useContext(MaterialsContext)
  const paddleBoxArgs = useMemo(() => [5, 20, 2])
  const model = useRef()
  // Make it a physical object that adheres to gravitation and impact
  const [ref, api] = useBox(() => ({ type: "Kinematic", args: paddleBoxArgs }))
  // use-frame allows the component to subscribe to the render-loop for frame-based actions
  let values = useRef([0, 0])
  useFrame(state => {
    // The paddle is kinematic (not subject to gravitation), we move it with the api returned by useBox
    // values.current[0] = lerp(values.current[0], (state.mouse.x * Math.PI) / 5, 0.2)
    values.current[1] = lerp(values.current[1], (state.mouse.x * Math.PI) / 5, 0.2)
    api.position.set(state.mouse.x * 10, state.mouse.y * 10, -state.mouse.y * 10)
    api.rotation.set(-2 * Math.PI, 0, values.current[1])
    // Left/right mouse movement rotates it a liitle for effect only
    const modelRotationZ = state.mouse.x < -0.3 ? -Math.PI : 0;
    model.current.rotation.z = modelRotationZ;
  })
  return (
    <group>
      {/*  */}
      <mesh ref={ref} dispose={null} rotation-x={-2 * Math.PI}>
        <group ref={model}  >
          <mesh >
            <boxBufferGeometry attach="geometry" args={paddleBoxArgs} />
            <meshBasicMaterial attach="material" wireframe color="red" />
          </mesh>
          <group rotation-y={Math.PI / 2}>
            <mesh castShadow receiveShadow material={greenWireframe} geometry={nodes.golfClub.geometry} />
          </group>
        </group>
      </mesh>
    </group>
  )
}

function Ball({ onInit }) {
  const radius = .5
  const [ref] = useSphere(() => ({
    mass: 1,
    args: radius,
    velocity: [0, 0, 0],
    // position: [0, 10, 0]
    position: [0, 5, 0],
  }))

  useEffect(() => {
    onInit()
  }, [])

  return (
    <mesh castShadow ref={ref}>
      <sphereBufferGeometry attach="geometry" args={[radius, 64, 64]} />
      <meshStandardMaterial attach="material" color="red" />
    </mesh>
  )
}

const dimensionSizeZ = 15
const dimensionSizeX = 30
const scaleX = .75
const scaleZ = 5
const dimensionSizeY = 10
const numInstances = dimensionSizeZ * dimensionSizeX// * dimensionSizeY
const tempObject = new THREE.Object3D()
const colors = new Array(numInstances).fill().map(() => 0xff00ff)
const tempColor = new THREE.Color()

function StartOverSurfaces({ rotation, position }) {
  // When the ground was hit we reset the game ...
  // const { reset } = useStore(state => state.api)
  const gameIsOn = useStore(state => state.gameIsOn)
  const { setGameShouldStartOver, setGameIsOn } = useStore(state => state.api)
  const [ref, api] = usePlane(() => ({
    type: "Static",
    rotation: rotation ? rotation : [-Math.PI / 2, 0, 0],
    position: position ? position : [0, -9, 0],
    onCollide: () => {
      setGameIsOn(false)
      setTimeout(() => {
        setGameIsOn(true)
      }, 2000);
    }
  }))
  useEffect(() => {
    if (!rotation || !position) return
    api.rotation.set(...rotation)
    api.position.set(...position)

  }, [rotation, position])
  return <mesh ref={ref}>
    <boxBufferGeometry attach="geometry" args={[1000, 1000]} />
    <meshStandardMaterial attach="material" color="black" />
  </mesh>
}


function BouncyGround() {
  // When the ground was hit we reset the game ...
  // const { reset } = useStore(state => state.api)
  const bouncyGroundBoxArgs = useMemo(() => [30, 1, 100])
  const [ref, api] = useBox(() => ({
    type: "Static",
    // rotation: [-Math.PI / 2, 0, 0],
    position: [0, -8, 0],
    args: bouncyGroundBoxArgs,
  }))
  return <mesh ref={ref} >
    {/* <meshBasicMaterial attach="material" color="yellow" />
    <boxBufferGeometry attach="geometry" args={bouncyGroundBoxArgs} /> */}
  </mesh>
}

const Box = React.forwardRef(({ children, transparent = false, opacity = 1, color = 'white', args = [1, 1, 1], ...props }, ref) => {
  console.log(children)
  return (
    <mesh receiveShadow castShadow ref={ref} {...props}>
      <boxBufferGeometry attach="geometry" args={args} />
      <meshStandardMaterial attach="material" color={color} transparent={transparent} opacity={opacity} />
      {children}
    </mesh>
  )
})


function Table() {
  const [plate] = useBox(() => ({ type: 'Static', position: [0, -0.8, 0], scale: [15, 0.5, 5], args: [2.5, 0.25, 2.5] }))
  const [leg1] = useBox(() => ({ type: 'Static', position: [-1.8, -3, 1.8], scale: [0.5, 4, 0.5], args: [0.25, 2, 0.25] }))
  const [leg2] = useBox(() => ({ type: 'Static', position: [1.8, -3, 1.8], scale: [0.5, 4, 0.5], args: [0.25, 2, 0.25] }))
  const [leg3] = useBox(() => ({ type: 'Static', position: [-1.8, -3, -1.8], scale: [0.5, 4, 0.5], args: [0.25, 2, 0.25] }))
  const [leg4] = useBox(() => ({ type: 'Static', position: [1.8, -3, -1.8], scale: [0.5, 4, 0.5], args: [0.25, 2, 0.25] }))
  return (
    <>
      <Box ref={plate} />
      <Box ref={leg1} />
      <Box ref={leg2} />
      <Box ref={leg3} />
      <Box ref={leg4} />
      {/* <Suspense fallback={null}>
        <Mug />
      </Suspense> */}
    </>
  )
}


const Lamp = () => {
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
        <pointLight intensity={10} distance={5} />
        <spotLight ref={light} position={[0, 20, 0]} angle={0.4} penumbra={1} intensity={0.6} castShadow />
      </mesh>
    </>
  )
}

function Plane({ transparent, color, ...props }) {
  const [ref] = usePlane(() => ({ ...props }));
  const { greenWireframe } = useContext(MaterialsContext)
  return (
    <mesh receiveShadow ref={ref} material={greenWireframe}>
      <planeBufferGeometry attach="geometry" args={[500, 500, 1000, 1000]} />
      {/* <meshStandardMaterial attach="material" color={color} /> */}
    </mesh>
  );
}



function Arena(props) {

  return (
    <group>
      {Object.values(props).map(plane =>

        <Plane {...plane} />
      )}
    </group>
  )
}

export default function Game(props) {
  const gameIsOn = useStore(state => state.gameIsOn)
  const { setGameIsOn } = useStore(state => state.api)
  return (
    <>
      <Court />
      <Lamp />
      <Table />
      <Arena {...props.arenaProps} />
      <StartOverSurfaces {...props.startOverSurfacesProps} />
      {/* <BouncyGround /> */}
      {gameIsOn && <Ball onInit={() => setGameIsOn(true)} />}
      <Suspense fallback={null}>
        <Equipment />
      </Suspense>
    </>
  )
}
