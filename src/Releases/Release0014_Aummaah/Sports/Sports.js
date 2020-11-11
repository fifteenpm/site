import React, { useEffect, useContext, useRef, useState, useMemo } from 'react';
import { Canvas, extend, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import TileGenerator from "../../../Common/Utils/TileGenerator";
import { Tennis } from "./Tennis";
import { MaterialsContext } from '../MaterialsContext';


export default function Sports() {

    const { camera, size } = useThree();

    const materials = useContext(MaterialsContext);
    const [tileGridSize, setTileGrideSize] = useState(10);


    // TODO This is forcing a 2d view but is probably very computationally expensive - orthographic camera? 
    useFrame(() => {
        // let lookAtPos = camera.position.copy(); // TODO this is erroring on 'Cannot read property 'x' of undefined'
        let lookAtPos = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);
        lookAtPos.y = 0;
        camera.position.y = 3.;
        camera.lookAt(lookAtPos);
    })


    return (<TileGenerator
        tileSize={1}
        grid={tileGridSize}
        tileComponent={Tennis}
        tileProps={materials}
    />
    );
}
