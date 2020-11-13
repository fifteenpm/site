import React, { useMemo, useRef } from 'react';
import { useFrame, useResource } from 'react-three-fiber';
import * as THREE from 'three';
import { useSphere, usePlane, useBox } from '@react-three/cannon'



// function TennisCourtSurface(props) {
//     const [plane] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [props.pos.x, props.pos.y, props.pos.z] }))
//     // const plane = useRef()
//     return (
//         <mesh ref={plane} material={props.tennisCourtSurface}>
//             {/* <mesh ref={plane} material={props.tennisCourtSurface} rotation={[-Math.PI / 2, 0, 0]} position={props.pos}> */}
//             <planeGeometry args={[props.size, props.size]} attach="geometry" />
//         </mesh>
//     );
// }

function TennisCourtSurface({ color, ...props }) {
    const [ref] = usePlane(() => ({ type: "Kinematic", ...props }))
    const scale = 1
    return (
        <mesh ref={ref} receiveShadow scale={[scale, scale, scale]}>
            <planeBufferGeometry attach="geometry" args={[props.size/2, props.size/2]}/>
            <meshPhongMaterial attach="material" color={color} side={THREE.Double} />
        </mesh>
    )
}


function TennisCourt(props) {
    console.log('TennisCourt props', props)
    return (
        <group>
            {/* <TennisCourtSurface position={[props.pos.x, props.pos.y, props.pos.z]} color="red" /> */}
            <TennisCourtSurface color="red" position={[props.pos.x, props.pos.y, props.pos.z - props.size/2]} rotation={[0, 0, Math.PI/2]} />
            <TennisCourtSurface color="yellow" position={[props.pos.x, props.pos.y, props.pos.z + props.size/2]} rotation={[0,  0, -Math.PI/2]} />
            <TennisCourtSurface color="green" position={[props.pos.x - props.size/2, props.pos.y, props.pos.z]} rotation={[0, Math.PI/2, 0]} />
            <TennisCourtSurface color="blue" position={[props.pos.x + props.size/2, props.pos.y, props.pos.z]} rotation={[0, -Math.PI/2, 0]} />
            <TennisCourtSurface color="gray" position={[props.pos.x, props.pos.y + props.size/2, props.pos.z]} rotation={[Math.PI/2, 0, 0]} />
            <TennisCourtSurface color="magenta" position={[props.pos.x, props.pos.y - props.size/2, props.pos.z]} rotation={[-Math.PI/2, 0, 0]} />
        </group>
    );
}


function TennisBall(props) {
    const [ball] = useSphere(() => ({
        mass: .01,
        position: [props.pos.x, props.pos.y + .1, props.pos.z],
        linearDamping: 0.3,
    })) //{ mass: 10 }))
    // const ball = useRef()
    // useFrame(() => {
    //     if (!ball.current) return;
    //     ball.current.rotation.y += .01
    // })
    // console.log("BALL", ball)

    return (
        // rotation-y={props.pos.y} scale={[.1,.1,.1]}>
        <mesh  material={props.tennisBall} ref={ball} scale={[.1,.1,.1]}> 
            {/* <sphereBufferGeometry attach="geometry" /> */}
            <sphereBufferGeometry attach="geometry" args={[props.size, props.size * 8]}/>
        </mesh>
    )
}

export const Tennis = function (props) {
    return <>
        <TennisCourt {...props} />
        
        <TennisBall {...props} />
    </>;
}
