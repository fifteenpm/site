
import { default as React, useContext } from 'react';
import { MaterialsContext } from '../MaterialsContext';
import ParametricCloth from './ParametricCloth';

export default function GamesCloth({textOnly=false, ...props}) {
    const { rgbashader, circleAlphaShader } = useContext(MaterialsContext)
    return <group>
        <ParametricCloth material={rgbashader} {...props} />
        {!textOnly && <ParametricCloth material={circleAlphaShader} {...props} />}
    </group>
}
