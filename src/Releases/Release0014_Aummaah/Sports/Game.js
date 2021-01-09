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
import niceColors from 'nice-color-palettes';
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
    {/* <GolfClub /> */}
    <group>
      {currentTrackName == C.AummaahTrack.Cricket && <CricketBat />}
      {currentTrackName == C.AummaahTrack.Tennis && <TennisRacquet />}
      {currentTrackName == C.AummaahTrack.Golf && <GolfClub />}
    </group>
  </>
  )
}

function CricketBat({ }) {
  // Load the gltf file
  const { nodes, materials } = useLoader(GLTFLoader, C.CRICKET_BAT_GLB)
  const { greenWireframe } = useContext(MaterialsContext)
  const paddleBoxArgs = useMemo(() => [8, 2, 1])
  const model = useRef()
  // Make it a physical object that adheres to gravitation and impact
  const [ref, api] = useBox(() => ({ type: "Kinematic", args: paddleBoxArgs }))
  // use-frame allows the component to subscribe to the render-loop for frame-based actions
  let values = useRef([0, 0])
  const yOffset = 2;
  useFrame(state => {
    // The paddle is kinematic (not subject to gravitation), we move it with the api returned by useBox
    // values.current[0] = lerp(values.current[0], (state.mouse.x * Math.PI) / 5, 0.2)
    values.current[1] = lerp(values.current[1], state.mouse.y, 0.2)
    api.position.set(state.mouse.x * 5, state.mouse.y + yOffset, 0)
    const mouseLeftOfCenter = state.mouse.x < -2.1;
    let rotationY = values.current[1]
    if (mouseLeftOfCenter) {
      rotationY = -rotationY
    } else if (state.mouse.y > .75) {
      rotationY = lerp(rotationY, 0, .2)
    }
    api.rotation.set(-2 * Math.PI, rotationY, 0)
    // Left/right mouse movement rotates it a liitle for effect only
    const modelRotation = mouseLeftOfCenter ? -Math.PI : 0;
    model.current.rotation.x = modelRotation;
    model.current.rotation.z = modelRotation;
    console.log(state.mouse.y)
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
          <group >
            <mesh castShadow receiveShadow material={greenWireframe} geometry={nodes.Mesh_0_0.geometry} />
            <mesh castShadow receiveShadow material={greenWireframe} geometry={nodes.Mesh_0_1.geometry} />>
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
    values.current[1] = lerp(values.current[1], (state.mouse.y * Math.PI) / 5 * 3, 0.2)
    api.position.set(state.mouse.x * 5, state.mouse.y * 3, -state.mouse.y * 5)
    const mouseLeftOfCenter = state.mouse.x < -0.5;
    api.rotation.set(-2 * Math.PI, mouseLeftOfCenter ? -values.current[1] : values.current[1], 0)
    // Left/right mouse movement rotates it a liitle for effect only
    const modelRotation = mouseLeftOfCenter ? -Math.PI : 0;
    model.current.rotation.x = modelRotation;
    model.current.rotation.z = modelRotation;
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
  const poleArgs = useMemo(() => [1, 16, .2])
  // const clubArgs = useMemo(() => [2, 2, 2])
  const model = useRef()
  // Make it a physical object that adheres to gravitation and impact
  const [poleRef, poleAPI] = useBox(() => ({ type: "Kinematic", args: poleArgs }))
  // const [clubRef, clubAPI] = useBox(() => ({ type: "Kinematic", args: clubArgs }))
  // use-frame allows the component to subscribe to the render-loop for frame-based actions
  let values = useRef([0, 0])
  useFrame(state => {


    // values.current[0] = lerp(values.current[0], (state.mouse.x * Math.PI) / 5, 0.2)
    values.current[1] = lerp(values.current[1], (state.mouse.y * Math.PI) / 5 * 2, .7)
    poleAPI.position.set(state.mouse.x * 10, 4, 0)//state.mouse.y * 10, -state.mouse.y * 10)
    poleAPI.rotation.set(values.current[1], 0, 0)
    // clubAPI.position.set(state.mouse.x * 10, state.mouse.y * 10, -state.mouse.y * 10)
    // clubAPI.rotation.set(-2 * Math.PI, 0, values.current[1])
    // Left/right mouse movement rotates it a liitle for effect only

    model.current.rotation.y = state.mouse.x > -0.3 ? -Math.PI : 0;;
  })

  return (
    <group>
      <mesh ref={poleRef} dispose={null} rotation-x={-2 * Math.PI}>
        <group ref={model}  >
          <mesh >
            <boxBufferGeometry attach="geometry" args={poleArgs} />
            <meshBasicMaterial attach="material" wireframe color="red" />
          </mesh>
          <group rotation-y={Math.PI / 2}>
            <mesh castShadow receiveShadow material={greenWireframe} geometry={nodes.golfClub.geometry} />
          </group>
        </group>
      </mesh>
      {/* <mesh ref={clubRef} dispose={null} rotation-x={-2 * Math.PI}>
        <boxBufferGeometry attach="geometry" args={clubArgs} />
        <meshBasicMaterial attach="material" wireframe color="red" />
      </mesh> */}
    </group>
  )
}

function Ball({ onInit, contactMaterial, mass = 1, radius = 0.5, velocity = [0, 5, 0], position = [0, 0, 0] }) {

  const [ref] = useSphere(() => ({
    mass: mass,
    args: radius,
    velocity: velocity,
    position: position,
    material: contactMaterial,

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

function StartOverSurfaces({ rotation, position, geometryArgs = [1000, 1000] }) {
  // When the ground was hit we reset the game ...
  // const { reset } = useStore(state => state.api)
  const gameIsOn = useStore(state => state.gameIsOn)
  const { setGameShouldStartOver, setGameIsOn } = useStore(state => state.api)
  const { greenWireframe } = useContext(MaterialsContext)
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
  return <mesh ref={ref} material={greenWireframe}>
    <boxBufferGeometry attach="geometry" args={geometryArgs} />
    {/* <meshStandardMaterial attach="material" color="black" /> */}
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
    </>
  )
}


function CricketWicket() {
  const contactMaterial = {
    // friction: 10,
    // restitution: 0.1,
    // contactEquationStiffness: 1e7,
    // contactEquationRelaxation: 1,
    // frictionEquationStiffness: 1e7,
    // frictionEquationRelaxation: 2,
  }

  const defaultMass = .1
  const props = useMemo(() => {
    return {
      leg1: {
        args: [.25, 2, .5],
        position: [-.7, 2, -10],
        mass: defaultMass,
        // velocity: [0, 2, 0]
      },
      leg2: {
        args: [.25, 2, .5],
        position: [0, 2, -10],
        mass: defaultMass,
      },
      leg3: {
        args: [.25, 2, .5],
        position: [.7, 2, -10],
        mass: defaultMass,
      },
      topLeft: {
        args: [.1, .6, .5],
        rotation: [0, 0, Math.PI / 2],
        position: [-.4, 3.1, -10],
        mass: defaultMass,
      },
      topRight: {
        args: [.1, .6, .5],
        rotation: [0, 0, Math.PI / 2],
        position: [.4, 3.1, -10],
        mass: defaultMass,
      },
    }
  })
  const [leg1] = useBox(() => ({ ...props.leg1 }))
  const [leg2] = useBox(() => ({ ...props.leg2 }))
  const [leg3] = useBox(() => ({ ...props.leg3 }))
  const [topLeft] = useBox(() => ({ ...props.topLeft }))
  const [topRight] = useBox(() => ({ ...props.topRight }))

  return (
    <>
      <Box ref={leg1} {...props.leg1} />
      <Box ref={leg2} {...props.leg2} />
      <Box ref={leg3} {...props.leg3} />
      <Box ref={topLeft} {...props.topLeft} />
      <Box ref={topRight} {...props.topRight} />
    </>
  )
}

function GolfTee(props) {

  const [plate] = useBox(() => ({ type: 'Static', ...props }))

  return (
    <>
      <Box ref={plate} {...props} />
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
        {/* <pointLight intensity={1} distance={5} /> */}
        <spotLight ref={light} color="yellow" position={[0, 20, 0]} angle={0.4} penumbra={1} intensity={0.2} castShadow />
      </mesh>
    </>
  )
}

function Plane({ transparent, color, boxArgs, contactMaterial = {}, ...props }) {
  const [ref] = useBox(() => ({
    type: "Kinematic", args: boxArgs, material: contactMaterial, ...props
  }));
  const { greenWireframe, naiveGlass, foamGrip } = useContext(MaterialsContext)
  return (
    <mesh receiveShadow ref={ref} >
      {/* <mesh receiveShadow ref={ref} material={greenWireframe}> */}
      {/* <planeBufferGeometry attach="geometry" args={boxArgs} /> */}
      <boxBufferGeometry attach="geometry" args={boxArgs} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  );
}


function Obstacles({ number = 15 }) {
  // const map = useLoader(THREE.TextureLoader, '/carbon_normal.jpg')
  const [ref] = useBox(index => ({
    mass: .02,
    position: [Math.random() - 0.5 * 5, Math.random() - 0.5, index * 2 - 40],
    // args: 1
    args: [.25, .25, .25],

  }))
  const colors = useMemo(() => {
    const array = new Float32Array(number * 3)
    const color = new THREE.Color()
    for (let i = 0; i < number; i++)
      color
        .set(niceColors[17][Math.floor(Math.random() * 5)])
        .convertSRGBToLinear()
        .toArray(array, i * 3)
    return array
  }, [number])
  return (
    <instancedMesh ref={ref} castShadow receiveShadow args={[null, null, number]}>
      <sphereBufferGeometry attach="geometry" args={[1, 16, 16]}>
        <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colors, 3]} />
      </sphereBufferGeometry>
      <meshBasicMaterial attach="material" color="blue" />
      {/* <meshPhongMaterial
        attach="material"
        vertexColors={THREE.VertexColors}
        normalMap={map}
        normalScale={[1, 1]}
        normalMap-wrapS={THREE.RepeatWrapping}
        normalMap-wrapT={THREE.RepeatWrapping}
        normalMap-repeat={[10, 10]}
      /> */}
    </instancedMesh>
  )
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
      {/* <Court /> */}
      {/* <Lamp /> */}
      {/* <Table /> */}
      {/* <Obstacles /> */}
      <GolfTee {...props.golfTeeProps} />
      {/* <CricketWicket /> */}
      <Arena {...props.arenaProps} />
      <StartOverSurfaces {...props.startOverSurfacesProps} />
      {/* <BouncyGround /> */}
      {gameIsOn && <Ball onInit={() => setGameIsOn(true)} {...props.ballProps} />}
      <Suspense fallback={null}>
        <Equipment />
      </Suspense>
    </>
  )
}
