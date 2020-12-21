// source: https://codesandbox.io/s/white-resonance-0mgum?file=/src/App.js:388-427
// react-three-fiber is a way to express threejs declaratively: https://github.com/react-spring/react-three-fiber
// use-cannon is a hook around the cannon.js physics library: https://github.com/react-spring/use-cannon
import { useBox, usePlane, useSphere } from '@react-three/cannon';
import clamp from "lodash-es/clamp";
import React, { useMemo, Suspense, useCallback, useContext, useEffect, useRef } from "react";
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

  // useEffect(() => {
  //   console.log("TRACK CHANED")
  //   if (currentTrackName == C.AummaahTrack.Tennis) {
  //     console.log("tennis")
  //   } else if (currentTrackName == C.AummaahTrack.Cricket) {
  //     console.log("cricket")
  //   } else if (currentTrackName == C.AummaahTrack.Golf) {
  //     console.log("golf")
  //   }
  // }, [currentTrackName])

  return (
    <group>
      {currentTrackName == C.AummaahTrack.Cricket && <CricketBat />}
      {currentTrackName == C.AummaahTrack.Tennis && <TennisRacquet />}
      {currentTrackName == C.AummaahTrack.Golf && <GolfClub />}
    </group>
  )
}

function CricketBat({ }) {
  // Load the gltf file
  const { nodes, materials } = useLoader(GLTFLoader, C.CRICKET_BAT_GLB)
  const { greenWireframe } = useContext(MaterialsContext)
  const paddleBoxArgs = useMemo(() => [4, 3, 1])
  const model = useRef()
  // Make it a physical object that adheres to gravitation and impact
  const [ref, api] = useBox(() => ({ type: "Kinematic", args: paddleBoxArgs, onCollide: e => { } }))
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

  console.log(nodes)

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
  const [ref, api] = useBox(() => ({ type: "Kinematic", args: paddleBoxArgs, onCollide: e => { } }))
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
  const paddleBoxArgs = useMemo(() => [4, 3, 1])
  const model = useRef()
  // Make it a physical object that adheres to gravitation and impact
  const [ref, api] = useBox(() => ({ type: "Kinematic", args: paddleBoxArgs, onCollide: e => { } }))
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
  console.log(nodes)

  return (
    <group>
      {/*  */}
      <mesh ref={ref} dispose={null} rotation-x={-2 * Math.PI}>
        <group ref={model}  >
          {/* <mesh >
            <boxBufferGeometry attach="geometry" args={paddleBoxArgs} />
            <meshBasicMaterial attach="material" wireframe color="red" />
          </mesh> */}
          {/* <Text rotation={[-Math.PI / 2, 0, 0]} position={[0, 1, 2]} size={1} /> */}
          {/* children={count.toString()} /> */}
          <group position-x={-2} rotation={[0, -0.04, 0]} >
          <mesh castShadow receiveShadow material={greenWireframe} geometry={nodes.golfClub.geometry} />
            

          </group>
        </group>
      </mesh>
    </group>
  )
}

function Ball({ onInit }) {
  // Load texture (the black plus sign)
  const map = useLoader(THREE.TextureLoader, earthImg)
  // Make the ball a physics object with a low mass
  // const { startOver } = useStore(state => state.startOver)
  // const [gameShouldStart]
  const radius = .75
  const [ref] = useSphere(() => ({
    mass: 1,
    args: radius,
    velocity: [0, 20, 40],
    position: [0, 10, -50]
  }))

  useEffect(() => {

    onInit()
  }, [])

  // }, [startOver])
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

function ContactGround() {
  // When the ground was hit we reset the game ...
  // const { reset } = useStore(state => state.api)
  const gameIsOn = useStore(state => state.gameIsOn)
  const { setGameShouldStartOver, setGameIsOn } = useStore(state => state.api)
  const [ref] = usePlane(() => ({
    type: "Static",
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -10, 0],
    onCollide: () => {
      setGameIsOn(false)
      setTimeout(() => {
        setGameIsOn(true)
      }, 2000);
    }
  }))
  return <mesh ref={ref} />
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
    onCollide: e => console.log("COLLIDE wbouncy"),
  }))
  return <mesh ref={ref} >
    {/* <meshBasicMaterial attach="material" color="yellow" />
    <boxBufferGeometry attach="geometry" args={bouncyGroundBoxArgs} /> */}
  </mesh>
}

export default function Game() {
  const gameIsOn = useStore(state => state.gameIsOn)
  const { setGameIsOn } = useStore(state => state.api)
  return (
    <>
      <Court />
      <ContactGround />
      <BouncyGround />
      {gameIsOn && <Ball onInit={() => setGameIsOn(true)} />}
      <Suspense fallback={null}>
        <Equipment />
      </Suspense>
    </>
  )
}
