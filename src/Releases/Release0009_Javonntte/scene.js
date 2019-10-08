import React, { useEffect, useRef } from 'react';
import { useResource, useThree, useRender } from 'react-three-fiber';
import * as THREE from 'three';
import { useGLTF } from "../../Utils/hooks";
import {
    Facade04Material,
    Facade10Material,
    Facade12Material,
    CloudMaterial,
    FoamGripMaterial,
    Windows1Material,
    Metal03Material,
    TronMaterial,
} from '../../Utils/materials';
import { onBuildingsLoaded } from "./buildings";
import { Camera } from './camera';
import * as C from "./constants";
import { Controls } from "./controls";
import "./index.css";
import { FixedLights } from './lights';
import { AsteroidBelt } from './AsteroidBelt';
import { generateAsteroids } from './asteroids';
import { Stars } from './stars';

export function Scene({ track }) {
    /* Note: Known behavior that useThree re-renders childrens thrice:
       issue: https://github.com/drcmda/react-three-fiber/issues/66
       example: https://codesandbox.io/s/use-three-renders-thrice-i4k6c
       tldr: Developer says that changing this behavior requires a major version bump and will be breaking.
       Their general recommendation/philosophy is that if you are "declaring calculations" they should implement useMemo
       (For instance: a complicated geometry.)
     */
    const { camera, canvas, scene } = useThree();
    const [loadingBuildings, buildingGeometries] = useGLTF(C.BUILDINGS_URL, onBuildingsLoaded);
    const [cloudMaterialRef, cloudMaterial] = useResource();
    const [foamGripMaterialRef, foamGripMaterial] = useResource();
    const [windows1MaterialRef, windows1Material] = useResource();
    const [facade04MaterialRef, facade04Material] = useResource();
    const [facade10MaterialRef, facade10Material] = useResource();
    const [facade12MaterialRef, facade12Material] = useResource();
    const [metal03MaterialRef, metal03Material] = useResource();
    const [tronMaterialRef, tronMaterial] = useResource();
    const lookAt = new THREE.Vector3(0, C.ASTEROID_MAX_RADIUS - C.ASTEROID_MAX_RADIUS * .5, C.ASTEROID_MAX_RADIUS - C.ASTEROID_MAX_RADIUS * .1);
    const asteroids = useRef();
    const asteroidFaceGroups = useRef();
    const asteroidsGeom = useRef();
    const asteroidVertexGroups = useRef();

    const road = useRef();

    useEffect(() => {

        if (asteroids.current) {
            // Define the curve 
            var closedSpline = new THREE.CatmullRomCurve3(asteroids.current.centroids, { closed: true, type: 'catmullrom', arcLengthDivisions: asteroids.current.centroids.length });

            // Set up settings for later extrusion
            var extrudeSettings = {
                steps: asteroids.current.centroids.length * 20,
                bevelEnabled: true,
                extrudePath: closedSpline
            };

            // Define a triangle
            var pts = [], count = 3;
            for (var i = 0; i < count; i++) {
                var l = 2;
                var a = 2 * i / count * Math.PI;
                pts.push(new THREE.Vector2(Math.cos(a) * l, Math.sin(a) * l));
            }
            var shape = new THREE.Shape(pts);

            // Extrude the triangle along the CatmullRom curve
            road.current = new THREE.ExtrudeGeometry(shape, extrudeSettings);
            // var material = new THREE.MeshLambertMaterial( { color: 0xb00000, wireframe: false } );

            // Create mesh with the resulting geometry
            // var mesh = new THREE.Mesh( geometry, material );
        }
    })

    useEffect(() => {
        // [asteroidsGeom.current, asteroidFaceGroups.current, asteroidVertexGroups.current] = generateAsteroids(
        asteroids.current = generateAsteroids(
            C.ASTEROID_BELT_RADIUS,
            C.ASTEROID_BELT_CENTER,
            C.NUM_ASTEROIDS,
            C.ASTEROID_MAX_RADIUS,
            C.ASTEROID_MAX_SIDES,
            C.ASTEROID_MAX_TIERS,
            C.ASTEROID_MAX_FACE_NOISE,
        )
    }, [])
    useEffect(() => { scene.background = new THREE.Color("black") });
    useEffect(() => {
        // These actions must occur after buildings load.
        camera.position.copy(C.START_POS);
        camera.lookAt(lookAt);

        // scene.fog = new THREE.FogExp2(0x0000ff, 0.1);

    }, [buildingGeometries])




    return (
        <>
            {/* use one material for all buildings  */}
            <FoamGripMaterial materialRef={foamGripMaterialRef} color={0x0000af} />
            <CloudMaterial materialRef={cloudMaterialRef} emissive={0xd4af37} />
            <Windows1Material materialRef={windows1MaterialRef} />
            <Facade10Material materialRef={facade10MaterialRef} />
            <Facade04Material materialRef={facade04MaterialRef} />
            <Facade12Material materialRef={facade12MaterialRef} />
            <Metal03Material materialRef={metal03MaterialRef} />
            <TronMaterial materialRef={tronMaterialRef} />
            {/* <FoamGripMaterial materialRef={cloudMaterialRef} /> */}
            {road.current && tronMaterialRef &&
                <mesh
                    geometry={road.current}
                    material={tronMaterial}
                />
            }
            <Camera
                maxDist={C.MAX_CAMERA_DIST}
                minDist={C.MIN_CAMERA_DIST}
                fov={75}
                near={1}
                far={10000}
                center={C.WORLD_CENTER}
                lightProps={{
                    intensity: 1.1,
                    // penumbra: 0.1,
                    distance: 10000,
                    shadowCameraNear: .0001,
                    shadowCameraFar: 200,
                    shadowMapSizeWidth: 512,
                    shadowMapSizeHeight: 512,
                }}
            />
            <Controls
                radius={C.ASTEROID_MAX_RADIUS}
                movementSpeed={5000}
                domElement={canvas}
                rollSpeed={Math.PI * .5}
                autoForward={false}
                dragToLook={false}
            />
            <FixedLights />
            {/* <Stars
                radius={C.ASTEROID_BELT_RADIUS / 40}
            /> */}
            {asteroids.current && foamGripMaterialRef && facade04Material && facade12Material && facade10Material && !loadingBuildings ?
                <>
                    <AsteroidBelt
                        track={track}
                        // TODO can combine this all into a n object or refernece directly the buffergeom
                        asteroids={asteroids.current}
                        // startPos={startPos}
                        buildings={{
                            geometries: buildingGeometries,
                            materials: [foamGripMaterial],//acade12Material],//[metal03Material, facade12Material, foamGripMaterial],
                            loaded: !loadingBuildings,
                        }}
                    />
                    {/* <FlatWorld
                        buildings={{
                            geometries: buildingGeometries,
                            materials: [foamGripMaterial],//acade12Material],//[metal03Material, facade12Material, foamGripMaterial],
                            loaded: !loadingBuildings,
                        }}
                    /> */}
                </> : null

            }
        </>
    );
}
