import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRender, useResource, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { faceCentroid, triangleFromFace } from '../../Utils/geometry';
import { CloudMaterial, TronMaterial } from '../../Utils/materials';
import { SphereTiles, tileId } from '../../Utils/SphereTiles';
import * as C from './constants';
import "./index.css";
import { Stars } from './stars';
import { pickTileFormation, SkyCityTile } from "./tiles";

// TODO tilt and rotationSpeed
export function generateWorldGeometry(radius, sides, tiers, maxHeight) {
    const geometry = new THREE.SphereGeometry(radius, sides, tiers);
    geometry.computeBoundingSphere();
    // variate sphere heights
    var vertexIndex;
    var vertexVector = new THREE.Vector3();
    var nextVertexVector = new THREE.Vector3();
    var firstVertexVector = new THREE.Vector3();
    var offset = new THREE.Vector3();
    var currentTier = 1;
    var lerpValue = 0.5;
    var heightValue;
    for (var j = 1; j < tiers - 2; j++) {
        currentTier = j;
        for (var i = 0; i < sides; i++) {
            vertexIndex = (currentTier * sides) + 1;
            vertexVector = geometry.vertices[i + vertexIndex].clone();
            if (j % 2 !== 0) {
                if (i == 0) {
                    firstVertexVector = vertexVector.clone();
                }
                nextVertexVector = geometry.vertices[i + vertexIndex + 1].clone();
                if (i == sides - 1) {
                    nextVertexVector = firstVertexVector;
                }
                lerpValue = (Math.random() * (0.75 - 0.25)) + 0.25;
                vertexVector.lerp(nextVertexVector, lerpValue);
            }
            heightValue = (Math.random() * maxHeight) - (maxHeight / 2);
            offset = vertexVector.clone().normalize().multiplyScalar(heightValue);
            geometry.vertices[i + vertexIndex] = (vertexVector.add(offset));
        }
    }
    return geometry;
}

// TODO this function needs to be passed to the SphereTileGenerator and folded into its logic somehow
export function generateWorldTileGeometries(sphereGeometry, geometries) {
    const vertices = sphereGeometry.vertices;
    const faces = sphereGeometry.faces;
    const formations = {};
    let prevFormationId = 0;
    // TODO here is a hacky version of allocating tiles by type.
    faces.forEach((face, index) => {
        const centroid = faceCentroid(face, vertices);
        const tId = tileId(centroid);
        const triangle = triangleFromFace(face, vertices);
        formations[tId] = pickTileFormation({ triangle, centroid, geometries, prevFormationId })
        prevFormationId = formations[tId].id;
    })
    return formations;
}

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

export function WorldSurface({ geometry, bpm }) {
    const [materialRef, material] = useResource();

    return <>
        <TronMaterial
            materialRef={materialRef}
            bpm={bpm}
            side={THREE.DoubleSide}
        />
        {material && <mesh
            geometry={geometry}
            material={material}
            receiveShadow
            material-opacity={0.1}
            material-reflectivity={.1}
        />}
    </>
}

export function World({ track, buildings, ...props }) {
    const { camera, scene } = useThree();
    const [worldRef, world] = useResource();
    const tileFormations = useRef();
    const [renderTiles, setRenderTiles] = useState(true);
    const sphereGeometry = useMemo(() => {
        return generateWorldGeometry(C.WORLD_RADIUS, C.SIDES, C.TIERS, C.MAX_FACE_HEIGHT);
    }, [C.WORLD_RADIUS, C.SIDES, C.TIERS, C.MAX_FACE_HEIGHT]);
    const radius = sphereGeometry.parameters.radius
    const distThreshold = radius + radius * .15;

    useEffect(() => {
        if (buildings.loaded) {
            tileFormations.current = generateWorldTileGeometries(sphereGeometry, buildings.geometries);
        }
    }, [])

    useEffect(() => {
        if (renderTiles && track) {
            scene.fog = track.theme.fogColor ? new THREE.FogExp2(track.theme.fogColor, 0.1) : null;
            scene.background = new THREE.Color(track.theme.backgroundColor);
        }
    }, [track])

    useRender((state, time) => {
        if ((time % .5).toFixed(1) == 0) {
            const distToCenter = camera.position.distanceTo(sphereGeometry.boundingSphere.center);
            const tooFarAway = distToCenter > distThreshold;
            setRenderTiles(!tooFarAway);
        }
    })

    useRender(() => {
        // if (worldRef.current) {
        //     worldRef.current.rotation.x += .001;
        // } 
    })

    return <group ref={worldRef}>
        {world && <>
            <Stars
                radius={radius}
                colors={track.theme.starColors}
            />
            <WorldSurface
                geometry={sphereGeometry}
                bpm={track && track.bpm}
            />
            {renderTiles ?
                <SphereTiles
                    rotation={worldRef.current.rotation}
                    sphereGeometry={sphereGeometry}
                    tileComponent={SkyCityTile}
                    tileElements={{
                        buildings: buildings,
                        formations: tileFormations.current,
                    }}
                    {...props}
                />
                :
                <AtmosphereGlow
                    radius={distThreshold - .2}
                />
            }
        </>
        }
    </group>
}