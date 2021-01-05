import { Physics, usePlane } from '@react-three/cannon';
import { default as React, useContext } from 'react';
import { useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { MaterialsContext } from '../MaterialsContext';

import TennisCourt from './TennisCourt'
import TileGenerator from '../../../Common/Utils/TileGenerator'
import Game from './Game.js'

export default function Games() {

    const { camera, size } = useThree();

    const materials = useContext(MaterialsContext);

    return (
        <Physics
            iterations={20}
            tolerance={0.0001}
            defaultContactMaterial={{
                friction: 0.9,
                restitution: 0.7,
                contactEquationStiffness: 1e7,
                contactEquationRelaxation: 1,
                frictionEquationStiffness: 1e7,
                frictionEquationRelaxation: 2,
            }}
            gravity={[0, -40, 0]}
        // allowSleep={false}
        >

            <Game />
        </Physics >
    );
}
