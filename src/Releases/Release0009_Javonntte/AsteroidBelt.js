import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRender, useResource, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { CloudMaterial, Ground29Material, TronMaterial } from '../../Utils/materials';
import { SphereTiles } from '../../Utils/SphereTiles';
import * as C from './constants';
import "./index.css";
import { Stars } from './stars';
import { generateInstanceGeometriesByName } from "./instances";
import NoiseSphereGeometry from '../../Utils/NoiseSphere';
import { generateAsteroids } from './asteroids';



function AtmosphereGlow({ radius }) {
    const geometry = useMemo(() => new THREE.SphereGeometry(radius, radius / 3, radius / 3))
    const [materialRef, material] = useResource();
    return <>
        <CloudMaterial materialRef={materialRef} />
        {material && <mesh
            geometry={geometry}
            material={material}
        />}
    </>
}

export function AsteroidsSurface({ geometry, bpm }) {
    const [tronMaterialRef, tronMaterial] = useResource();
    const [ground29MaterialRef, ground29Material] = useResource();
    return <>
        <TronMaterial
            materialRef={tronMaterialRef}
            bpm={bpm}
            side={THREE.BackSide}
        />
        <Ground29Material
            materialRef={ground29MaterialRef}
            side={THREE.FrontSide}
        // color={0x0000af}
        />
        {tronMaterial && ground29Material &&
            <group>
                <mesh
                    geometry={geometry}
                    material={tronMaterial}
                />
                <mesh
                    geometry={geometry}
                    material={ground29Material}
                    receiveShadow
                />
            </group>
        }
    </>
}

export function AsteroidBelt({ track, buildings, neighborhoods, ...props }) {
    const [asteroidBeltRef, asteroidBelt] = useResource();
    const tileInstances = useRef();
   const asteroids = useMemo(() => {
       return generateAsteroids(
            C.ASTEROID_BELT_RADIUS,
            C.ASTEROID_BELT_CENTER,
            C.NUM_ASTEROIDS,
            C.ASTEROID_MAX_RADIUS,
            C.ASTEROID_MAX_SIDES,
            C.ASTEROID_MAX_TIERS,
            C.ASTEROID_MAX_FACE_NOISE,
        )
    }, [])

    useEffect(() => {
        // if (buildings.loaded) {
        //     tileInstances.current = generateInstanceGeometriesFromFaces(
        //         asteroids.faceGroups,
        //         asteroids.vertexGroups,
        //         buildings,
        //         C.ASTEROID_NEIGHBORHOOD_PROPS
        //     );
        // }
        if (buildings.loaded) {
            // TODO this is the naive approach but we need to combine alike geometries from both spheres at the time of instancing to reduce draw calls.
            tileInstances.current = generateInstanceGeometriesByName({
                surface: asteroids,
                buildings,
                neighborhoods: neighborhoods
            });
        }
    })

    // useRender(() => {
    //     if (asteroidBeltRef.current) {
    //         // astroidBeltRef.current.rotation.x += .01;
    //     }
    // })

    return <group ref={asteroidBeltRef}>
            {asteroidBelt &&
                <>
                    {asteroids &&
                        <AsteroidsSurface
                            geometry={asteroids.geometry}
                            bpm={track && track.bpm}
                        />
                    }
                    {tileInstances.current &&
                        Object.keys(tileInstances.current).map(tId => {
                            return <primitive key={tId}
                                object={tileInstances.current[tId]}
                            />
                        })
                    }
                </>
            }
        </group>
}