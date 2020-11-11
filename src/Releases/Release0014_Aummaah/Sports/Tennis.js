import React from 'react';
import { useResource } from 'react-three-fiber';
import * as THREE from 'three';



function TennisCourt(props) {
    return (
        <mesh rotation={new THREE.Euler(-Math.PI / 2, 0, 0)} position={props.pos} material={props.tennisCourtSurface}>
            <planeGeometry args={[props.size, props.size]} attach="geometry" />
        </mesh>
    );
}


function TennisBall(props) {
    return (
        <mesh position={props.pos} scale={[.1, .1, .1]} material={props.tennisBall}>
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
