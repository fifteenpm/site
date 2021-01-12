// source: https://codesandbox.io/s/white-resonance-0mgum?file=/src/App.js:388-427
// react-three-fiber is a way to express threejs declaratively: https://github.com/react-spring/react-three-fiber
// use-cannon is a hook around the cannon.js physics library: https://github.com/react-spring/use-cannon
import { usePlane } from '@react-three/cannon';
import React, { useContext, useEffect } from "react";
import { MaterialsContext } from '../MaterialsContext';
import { useStore } from "./hooks.js";


export default function StartOverSurfaces({ rotation, position, geometryArgs = [100, 100] }) {
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
    return <mesh visible={false} ref={ref} material={greenWireframe}>
        <boxBufferGeometry attach="geometry" args={geometryArgs} />
        {/* <meshStandardMaterial attach="material" color="black" /> */}
    </mesh>
}