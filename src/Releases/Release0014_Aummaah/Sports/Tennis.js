import React, { useMemo, useRef } from 'react';
import { useFrame, useResource } from 'react-three-fiber';
import * as THREE from 'three';



function TennisCourt(props) {
    return (
        <mesh rotation={new THREE.Euler(-Math.PI / 2, 0, 0)} position={props.pos} material={props.tennisCourtSurface}>
            <planeGeometry args={[props.size, props.size]} attach="geometry" />
        </mesh>
    );
}


function TennisBall(props) {
    const ball = useRef()
    useFrame(() => {
        if (!ball.current) return;
        ball.current.rotation.y += .01
    })
    const pos = useMemo(() =>{
        return [props.pos.x, props.pos.y + .2, props.pos.z]
    })
    return (
        <mesh position={pos} scale={[.1, .1, .1]} material={props.tennisBall} ref={ball} rotation-y={props.pos.y}>
            <sphereBufferGeometry attach="geometry" />
        </mesh>
    )
}

export const Tennis = function (props) {
    return <>
        <TennisCourt {...props} />
        <TennisBall {...props} />
        {/* <TileElement {...props} /> */}
    </>;
}
