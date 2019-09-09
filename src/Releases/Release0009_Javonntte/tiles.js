import React, { useMemo, useRef } from 'react';
import { useResource, useRender } from 'react-three-fiber';
import * as THREE from 'three';
import { TronShader } from '../../Shaders/TronShader';
import { faceCentroid, getMiddle, triangleCentroid, triangleFromFace } from '../../Utils/geometry';
import { randVal, randomClone } from "./utils";
import { Building, buildingName } from "./buildings";

// TODO rm me
function random(seed) {
    var x = Math.sin(seed) * 10000;
    var r = x - Math.floor(x);
    return r;
}

// TODO rm me
function getRandomColor(centroid) {
    var letters = '0123456789ABCDEF';
    var color = '#';
    var seed = random(centroid.x * centroid.y * centroid.z) * 10000;
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(random(seed++) * 16)];
    }
    return color;
}
function pickTilePattern(triangle) {

    const area = triangle.getArea();
    // TODO calculate area buckets given data
    if (area < 1.6) {
        return "large"; // TODO make these randomly picked from lists
    } else if (area >= 1.6 && area < 3) {
        return "large"; // TODO make these randomly picked from lists
    } else if (area >= 3) {
        return "large"
    }
}

// TODO refactor
function subdivideTriangle(tri, centroid, formation) {
    const i1 = tri.a;
    const i2 = tri.b;
    const i3 = tri.c;
    const a = getMiddle(tri.a, tri.b);
    const b = getMiddle(tri.b, tri.c);
    const c = getMiddle(tri.a, tri.c);
    const triangles = [];
    switch (formation) {
        case "small":
            triangles.push(tri);
            break;
        case "large":
            // all same size
            triangles.push({ size: "small", centroid: triangleCentroid(new THREE.Triangle(i1, a, centroid)) });
            triangles.push({ size: "medium", centroid: triangleCentroid(new THREE.Triangle(a, i2, centroid)) });
            triangles.push({ size: "small", centroid: triangleCentroid(new THREE.Triangle(i2, b, centroid)) });
            triangles.push({ size: "small", centroid: triangleCentroid(new THREE.Triangle(b, i3, centroid)) });
            triangles.push({ size: "small", centroid: triangleCentroid(new THREE.Triangle(i3, c, centroid)) });
            triangles.push({ size: "small", centroid: triangleCentroid(new THREE.Triangle(c, i1, centroid)) });
            break;
        case "bigLeft1":
            // big on left, medium on top, small on bottom right
            triangles.push({ size: "large", centroid: triangleCentroid(new THREE.Triangle(i1, i2, c)) });
            triangles.push({ size: "medium", centroid: triangleCentroid(new THREE.Triangle(i2, i3, centroid)) }); // medium building
            triangles.push({ size: "small", centroid: triangleCentroid(new THREE.Triangle(i3, c, centroid)) }); // narrow building
            break;
        case "extraSmall":
            const equalTriangles = subdivideTriangle(tri, centroid, "medium");
            for (let i = 0; i < equalTriangles.length; i++) {
                const halvedTriangles = subdivideTriangle(equalTriangles[i], triangleCentroid(equalTriangles[i]), "medium");
                for (let j = 0; j < halvedTriangles.length; j++) {
                    triangles.push(halvedTriangles[j]);
                }
            }
            break;
        case "small":
    }
    return triangles;
}

function TileSurface({ face, triangle, normal, centroid, ...props }) {
    const [materialRef, material] = useResource();
    const [geometryRef, geometry] = useResource();
    const vertices = new Float32Array([
        triangle.a.x, triangle.a.y, triangle.a.z,
        triangle.b.x, triangle.b.y, triangle.b.z,
        triangle.c.x, triangle.c.y, triangle.c.z,
    ])
    const geom = new THREE.Geometry();
    geom.vertices.push(triangle.a);
    geom.vertices.push(triangle.b);
    geom.vertices.push(triangle.c);
    triangle.getNormal(normal);
    geom.faces.push(new THREE.Face3(0, 1, 2, normal));
    return <>
        <boxGeometry ref={geometryRef} />
        <meshBasicMaterial ref={materialRef} color="red" />
        {geometry && material ?
            <mesh
                geometry={geometry}
                material={material}
                position={centroid}
            /> : null
        }
    </>
}

function BuildingsOnTile({ formation, triangle, centroid, normal, buildingGeometries, ...props }) {
    const buildingGroupRef = useRef();
    // get centroids based on formation type
    const subdivisions = subdivideTriangle(triangle, centroid, formation);
    const color = getRandomColor(centroid); // TODO temporary color to help debug
    // const [hasRendered, setHasRendered] = useState(0)
    return <group>
        {subdivisions.map(subdivision => {
            const geometry = randomClone(buildingGeometries[subdivision.size]);
            // const geometry = buildingGeometries.medium[3];
            return <group ref={buildingGroupRef} key={buildingName(geometry, subdivision.centroid)}>
                <Building geometry={geometry} centroid={subdivision.centroid} normal={normal} color={color} />
            </group>
        })}
    </group>;
}

export const CityTile = props => {
    return <group>
        <BuildingsOnTile formation={pickTilePattern(props.triangle)} {...props} />
    </group>
}