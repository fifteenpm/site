import React from 'react';
import { useResource } from 'react-three-fiber';
import * as THREE from 'three';
// import { TronMaterial } from '../../../Common/Materials/TronMaterial'
import { randVal } from "./utils"

function TileBuilding(props) {
    console.log("PROPS", props)
    const [materialRef, material] = useResource();
    return <>
        <TronMaterial materialRef={materialRef} {...props} />
        {material && props.tileResources ? (
            <mesh
                geometry={randVal(props.tileResources)}
                material={material}
                position={props.pos}
                rotation={new THREE.Euler(Math.PI / 2, 0, 0)}
            />

        ) : null}
    </>;
}

// function TileStreet(props) {
//     const [materialRef, material] = useResource();
//     const [geometryRef, geometry] = useResource();
//     return <>
//         <boxGeometry args={[3., .01]} ref={geometryRef} />
//         <TronMaterial materialRef={materialRef} {...props} />
//         {/* <meshBasicMaterial ref={materialRef} color={"red"} /> */}
//         {material && geometry && (
//             <mesh
//                 position={props.pos}
//                 scale={[.1, .1, .1]}
//                 material={material}
//                 geometry={geometry}
//             />
//         )}
//     </>
// }

function TileFloor(props) {
    const [materialRef, material] = useResource();
    const [geometryRef, geometry] = useResource();
    console.log("FLOOR POSITION:", props.pos)
    return (
        <>
            <meshBasicMaterial ref={materialRef} color="red" />
            {/* <TronMaterial materialRef={materialRef} {...props} /> */}
            <planeGeometry args={[props.size, props.size]} ref={geometryRef} />
            {material && geometry && (
                <mesh
                    geometry={geometry}
                    material={material}
                    position={props.pos}
                    rotation={new THREE.Euler(-Math.PI / 2, 0, 0)}
                >
                </mesh>
            )}
        </>
    );
}

function TileElement(props) {
    if (props.pos.z % 5 === 0 || props.pos.x % 5 === 0) return TileStreet(props);
    else return TileBuilding(props);
}


function TennisBall(props) {
    return (
        <mesh position={props.pos} scale={[.1, .1, .1]} >
            <sphereBufferGeometry attach="geometry" />
            <meshBasicMaterial attach="material" color={"orange"} />
        </mesh>
    )
}

export const Tennis = function (props) {
    return <>
        <TileFloor {...props} />
        <TennisBall {...props} />
        {/* <TileElement {...props} /> */}
    </>;
}
