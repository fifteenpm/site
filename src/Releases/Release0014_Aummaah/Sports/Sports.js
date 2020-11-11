import React, { useEffect, useContext, useRef, useState, useMemo } from 'react';
import { Canvas, extend, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import TileGenerator from "../../../Common/Utils/TileGenerator";
import { Tennis } from "./Tennis";
import { MaterialsContext } from '../MaterialsContext';


export default function Sports() {

    const { camera, size } = useThree();

    const materials = useContext(MaterialsContext);
    const [tileGridSize, setTileGrideSize] = useState(10);


    return (<TileGenerator
        tileSize={1}
        grid={tileGridSize}
        tileComponent={Tennis}
        tileProps={materials}
    />
    );
}
