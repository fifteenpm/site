import { assetPath } from '../../Common/Utils/assets.js'

// EQUIPMENT
export const PING_PONG_GLB = assetPath("14/objects/pingpong/main.glb")
export const TENNIS_RACQUET_GLB = assetPath("14/objects/tennis-racquet/main.glb")
export const GOLF_CLUB_GLB = assetPath("14/objects/golf-club/main.glb")
export const CRICKET_BAT_GLB = assetPath("14/objects/cricket-bat/main.glb")


// LANDSCAPES
export const GOLF_COURSE_GLB = assetPath("14/objects/golf-course/main.glb")

// BACKGROUND
export const AUMMAAH_MARQUEE_GLB = assetPath("14/objects/aummaah/main.glb");
export const AUMMAAH_FLAG_IMG = assetPath("14/images/aummaah.png")
export const SPORTS_FLAG_IMG = assetPath("14/images/sports.png")
export const GAMES_FLAG_IMG = assetPath("14/images/games.png")
export const AUMMAAH_FLAG_ALPHA_IMG = assetPath("14/images/aummaah-alpha.png")
export const SUN_PNG = assetPath("14/images/sun.png")

// TRACK PARTICULARS
export const AummaahTrack = {
    Tennis: "Tennis",
    Golf: "Golf",
    Cricket: "Cricket"
}

export const TRACKS_CONFIG = {}
export const FIRST_TRACK = AummaahTrack.Golf

TRACKS_CONFIG[AummaahTrack.Tennis] = {
    equipmentURL: TENNIS_RACQUET_GLB,
    startOverSurfacesProps: {
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -10, 0],
    },
    ballProps: {
        position: [0, 10, -20],
        velocity: [0, -2, 1],
        mass: 1.,
        radius: .5,
        contactMaterial: {
            friction: 0.9,
            restitution: 0.1,
            contactEquationStiffness: 1e7,
            contactEquationRelaxation: 1,
            frictionEquationStiffness: 1e7,
            frictionEquationRelaxation: 2,
        }
    },
    arenaProps: {
        leftBorder: {
            position: [-12, 0, 0],
            rotation: [0, 0.9, 0],
            color: "aqua"
        },
        rightBorder: {
            position: [12, 0, 0],
            rotation: [0, -0.9, 0],
            color: "chartreuse",
        },
        ground: {
            position: [0, -6, 0],
            rotation: [-1.7, 0, 0],
            color: "lightcoral",
        },
    },




}


TRACKS_CONFIG[AummaahTrack.Cricket] = {
    equipmentURL: CRICKET_BAT_GLB,
    startOverSurfacesProps: {
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -10, 0],
        geometryArgs: [250, 250, 20, 20],
    },
    ballProps: {
        position: [0, 5, -15],
        velocity: [0, -30, 5],
        mass: 1.,
        radius: .5,
        contactMaterial: {
            friction: 0.9,
            restitution: 0.7,
            contactEquationStiffness: 1e7,
            contactEquationRelaxation: 1,
            frictionEquationStiffness: 1e7,
            frictionEquationRelaxation: 2,
        }
    },
    arenaProps: {
        leftBorder: {
            position: [-48, 0, 0],
            rotation: [0, 0.9, 0],
            color: "aqua",
            boxArgs: [100, 100, 1, 100, 100, 10]
        },
        rightBorder: {
            position: [48, 0, 0],
            rotation: [0, -0.9, 0],
            color: "chartreuse",
            boxArgs: [100, 100, 1, 100, 100, 10]
        },
        ground: {
            position: [0, 0, 0],
            rotation: [-Math.PI / 2, 0, 0],
            color: "lightcoral",
            boxArgs: [12, 248, 1, 100, 100, 10],
            contactMaterial: {
                friction: 0.9,
                restitution: 0.7,
                contactEquationStiffness: 1e7,
                contactEquationRelaxation: 1,
                frictionEquationStiffness: 1e7,
                frictionEquationRelaxation: 2,
            }
        },
    },

}


TRACKS_CONFIG[AummaahTrack.Golf] = {
    equipmentURL: GOLF_CLUB_GLB,
    startOverSurfacesProps: {
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -10, 0],
    },
    ballProps: {
        position: [0, 5, 3.5],
        velocity: [0, 0, 0],
        mass: .01,
        radius: .1,
        contactMaterial: {
            friction: 0.9,
            restitution: 0.1,
            contactEquationStiffness: 1e7,
            contactEquationRelaxation: 1,
            frictionEquationStiffness: 1e7,
            frictionEquationRelaxation: 2,
        },
    },
    arenaProps: {
        // leftBorder: {
        //     position: [-24, 0, 0],
        //     rotation: [0, 0.9, 0],
        //     color: "aqua"
        // },
        // rightBorder: {
        //     position: [24, 0, 0],
        //     rotation: [0, -0.9, 0],
        //     color: "chartreuse",
        // },
        ground: {
            position: [0, 0, -10],
            rotation: [-Math.PI / 2, 0, 0],
            color: "lightcoral",
            boxArgs: [20, 30, 1, 100, 100, 10],
        },
    },
    golfTeeProps: {
        position: [0, .5, 3.5],
        args: [.05, .25, .015],
        type: "Kinematic",
    },
    equipmentProps: {
        poleArgs: [1, 3, .2],
        positionY: 1.5,
        positionZ: 4.4,
        mass: 100,
        contactMaterial: {
            friction: 0,
            restitution: 0.1,
            contactEquationStiffness: 1e7,
            contactEquationRelaxation: 1,
            frictionEquationStiffness: 1e7,
            frictionEquationRelaxation: 2,
        }
    }
}
