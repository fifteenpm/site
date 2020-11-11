import React, { useEffect } from 'react';
import Sports from './Sports/Sports.js'
import Glitchy from './glitchy/index.js'

import Flying from '../../Common/Controls/Flying'
import { MaterialsProvider } from './MaterialsContext.js';
import { Suspense } from 'react';
// crazy glitch 778e1868d6e437efd56591ac910226644d883c0f
// flat tiling a76fc468aae5e1d690c87a9935a71a797c1ae8a2

export function Scene({ }) {
    return <>
        <Flying />
        <ambientLight />
        <MaterialsProvider>
            <Sports />
        </MaterialsProvider>
    </>
}
