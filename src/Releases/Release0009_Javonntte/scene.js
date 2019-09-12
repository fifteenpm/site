import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useResource, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { soundcloudTrackIdFromSrc } from '../../Utils/Audio/SoundcloudUtils';
import { useGLTF } from "../../Utils/hooks";
import { CloudMaterial } from '../../Utils/materials';
import { onBuildingsLoaded } from "./buildings";
import { Camera } from './camera';
import * as C from "./constants";
import { Controls } from "./controls";
import "./index.css";
import { FixedLights } from './lights';
import { SkyCityTile } from "./tiles";
import { generateWorldGeometry, generateWorldTilePatterns, World } from './world';

console.log(C.TRACK_LOOKUP);

// TODO think about how to encapsulate these initial declarations
export function Scene({ mediaRef }) {
    /* Note: Known behavior that useThree re-renders childrens thrice:
       issue: https://github.com/drcmda/react-three-fiber/issues/66
       example: https://codesandbox.io/s/use-three-renders-thrice-i4k6c
       tldr: Developer says that changing this behavior requires a major version bump and will be breaking.
       Their general recommendation/philosophy is that if you are "declaring calculations" they should implement useMemo
       (For instance: a complicated geometry.)
     */
    const { camera, canvas } = useThree();
    const [loadingBuildings, buildings] = useGLTF(C.BUILDINGS_URL, onBuildingsLoaded);
    const [cloudMaterialRef, cloudMaterial] = useResource();
    const worldTilePatterns = useRef(); // TODO rm me
    // TODO having trouble figuring out mediaRef state handling
    const [track, setTrack] = useState();
    // const [bpm, setBPM] = useState(C.BPM_LOOKUP[curTrackId]); <-- maybe something like ...

    const worldSphereGeometry = useMemo(() => {
        return generateWorldGeometry(C.WORLD_RADIUS, C.SIDES, C.TIERS, C.MAX_FACE_HEIGHT);
    }, [C.WORLD_RADIUS, C.SIDES, C.TIERS, C.MAX_FACE_HEIGHT]);

    const startPos = new THREE.Vector3(0, 0, C.WORLD_RADIUS * 1.13);
    const lookAt = new THREE.Vector3(0, C.WORLD_RADIUS - C.WORLD_RADIUS * .5, C.WORLD_RADIUS - C.WORLD_RADIUS * .1);

    useEffect(() => {
        // These actions must occur after buildings load.
        camera.position.copy(startPos);
        camera.lookAt(lookAt);
        // TODO rm me
        if (buildings) worldTilePatterns.current = generateWorldTilePatterns(worldSphereGeometry, buildings);
    }, [buildings])

    // TODO having trouble figuring out mediaRef state handling
    useEffect(() => {
        const trackId = soundcloudTrackIdFromSrc(mediaRef.current.currentSrc);
        console.log("TRACK ID", trackId)
        console.log('track', C.TRACK_LOOKUP[trackId])
        setTrack(C.TRACK_LOOKUP[trackId]);
        console.log("TRACK", track)
    }, [track]);

    return (
        <>
            {/* use one material for all buildings  */}
            <CloudMaterial materialRef={cloudMaterialRef} />
            <Camera
                fov={25}
                near={.01}
                far={1e7}
                lightProps={{
                    intensity: 1,
                    penumbra: 0.01,
                    distance: 60,
                    shadowCameraNear: 10,
                    shadowCameraFar: 200,
                    shadowMapSizeWidth: 2048,
                    shadowMapSizeHeight: 2048,
                }}
            />
            <Controls
                radius={C.WORLD_RADIUS}
                movementSpeed={30}
                domElement={canvas}
                rollSpeed={Math.PI}// / 2}
                autoForward={false}
                dragToLook={false}
            />
            <FixedLights />
            {cloudMaterial && buildings &&
                <World
                    track={track}
                    sphereGeometry={worldSphereGeometry}
                    geometries={buildings} // TODO currently passing buildings in to two places here so reimagine data structure...
                    startPos={startPos}
                    tileComponent={SkyCityTile}
                    tileElements={{
                        buildings: {
                            geometries: buildings, // TODO buildings passed in two places
                            material: cloudMaterial
                        },
                        lookup: worldTilePatterns.current, // This is not longer passed in now e
                    }}
                />
            }
        </>
    );
}
