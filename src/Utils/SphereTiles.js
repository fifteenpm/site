import React, { useEffect, useRef, useState } from 'react';
import { useRender, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { faceCentroid, triangleFromFace } from './geometry';
import { findNearest, loadKDTree } from './KdTree';
import {tileId} from './tiles';

function initFaceTile(face, centroid, triangle) {
    return {
        id: tileId(centroid),
        centroid: centroid,
        normal: face.normal,
        triangle: triangle,
        hasRendered: false,
        visible: true,//false, // TODO
    }
}

function triangleInFrustum(frustum, triangle) {
    if (frustum.containsPoint(triangle.a)) return true;
    if (frustum.containsPoint(triangle.b)) return true;
    if (frustum.containsPoint(triangle.c)) return true;
    return false;
}

export function SphereTiles({ rotation, sphereGeometry, tileComponent, tileElements }) {
    const { camera } = useThree();
    const [lastUpdateTime, setLastUpdateTime] = useState(0);
    const searchPosition = useRef(new THREE.Vector3());
    const prevSearchPosition = useRef(new THREE.Vector3());
    const tilesGroup = useRef(new THREE.Group());
    const allTiles = useRef([]);
    const kdTree = useRef();
    const closestTiles = useRef([]);
    const cameraRaycaster = new THREE.Raycaster;
    const inFrontOfCamera = new THREE.Vector3();
    const radius = sphereGeometry.parameters.radius;
    const maxDistance = Math.pow(radius / 2 * Math.PI, 2);
    const numMatches = 33; // TODO a prop (for kdTree) but > 100 might be too much for most comps...

    const getSearchPosition = () => {
        cameraRaycaster.setFromCamera(new THREE.Vector2(), camera);
        const worldPos = cameraRaycaster.ray.at(radius / 5, inFrontOfCamera);
        // const sphereRelativePos = new THREE.Vector3(
        //  worldPos.x - Math.sin(rotation.z) * radius,
        //  worldPos.y - Math.sin(rotation.x) * radius,
        //  worldPos.z - Math.cos(rotation.x) * radius,
        // worldPos.x * Math.cos(rotation.x) - worldPos.y * Math.sin(rotation.x),
        // worldPos.y * Math.cos(rotation.x) - worldPos.x * Math.sin(rotation.x),
        // worldPos.z,
        // )
        // console.log(rotation, sphereRelativePos);
        // return sphereRelativePos;
        return worldPos;
    }

    useEffect(() => {
        allTiles.current = generateTiles(sphereGeometry);
        kdTree.current = loadKDTree(allTiles.current);
    }, [])

    useRender((state, time) => {
        if ((time % .05).toFixed(2) == 0) {
            searchPosition.current = getSearchPosition();
        }
        if (prevSearchPosition.current.distanceTo(searchPosition.current) > 2 * Math.PI / radius) {
            const [neighborhoodRadius, allClosestTiles] = findNearest(searchPosition.current, kdTree.current, numMatches, maxDistance, allTiles.current);
            closestTiles.current = allClosestTiles;
            prevSearchPosition.current.copy(searchPosition.current);
            setLastUpdateTime(time); // TODO better way to set state??
        }
    });

    return <group ref={tilesGroup}>
        {closestTiles.current && closestTiles.current.map(props => {
            return <group key={props.id}>
                <MemoizedSphereTile
                    {...props}
                    tileElements={tileElements}
                    tileComponent={tileComponent}
                    tileId={props.id}
                />
            </group>
        })}
    </group>
}

export const MemoizedSphereTile = React.memo(props => {
    if (!props.visible) return null; // TODO remove?
    return <>{props.tileComponent(props)}</>;
}, props => !props.isRendered);

export function generateTiles(sphereGeometry) {
    const vertices = sphereGeometry.vertices;
    const tiles = {}
    sphereGeometry.faces.forEach((face, index) => {
        const triangle = triangleFromFace(face, vertices);
        const centroid = faceCentroid(face, vertices);
        const tile = initFaceTile(face, centroid, triangle);
        const tId = tileId(centroid);
        tiles[tId] = tile;
    })
    return tiles;
}