import { Physics, usePlane } from '@react-three/cannon';
import { default as React, useContext } from 'react';
import { useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { MaterialsContext } from '../MaterialsContext';

import { Tennis } from './Tennis'
import TileGenerator from '../../../Common/Utils/TileGenerator'

export default function Sports() {

    const { camera, size } = useThree();

    const materials = useContext(MaterialsContext);

    return (
        <Physics
        // https://github.com/schteppe/cannon.js/wiki/Parameter-tweaking
        iterations={10}
        tolerance={0.001}
        defaultContactMaterial={{
          friction: 15,
          restitution: 0.0001,
          contactEquationStiffness: 1e1,
          contactEquationRelaxation: 1,
          frictionEquationStiffness: 1e7,
          frictionEquationRelaxation: 2,
        }}
        gravity={[0, -1, 0]}
        allowSleep={false}
            // maximum amount of physics objects inside scene (helps with memory)
            // size={100}
        // step= {1 / 60},
        //     gravity = [0, -10, 0],
        //     tolerance = 0.001,
        //     iterations = 5,
        //     allowSleep = false,
        //     broadphase = 'Naive',
        //     axisIndex = 0,
        //     defaultContactMaterial = {
        //         contactEquationStiffness: 1e6,
        //     },
        //     // Maximum amount of physics objects inside your scene
        //     // Lower this value to save memory, increase if 1000 isn't enough
        //     size = 1000,
        >
            {/* <TennisCourt pos={{x: 0, y:0, z:0}} size={.5}/> */}
            < TileGenerator
                tileSize={1}
                gridSize={3}
                tileComponent={Tennis}
                tileProps={materials}
            />
        </Physics >
    );
}
