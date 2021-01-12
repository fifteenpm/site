import { Vec3 } from 'cannon'
import { assetPath } from '../../Common/Utils/assets.js'

// SCENE
export const CAMERA_START = [0, 1.5, 12]

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
export const FIRST_TRACK = AummaahTrack.Tennis

TRACKS_CONFIG[AummaahTrack.Tennis] = {
    equipmentURL: TENNIS_RACQUET_GLB,

    startOverSurfacesProps: {
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -10, 0],
    },
    ballProps: {
        position: [0, 8, -20],
        velocity: [0, 0, 7],
        mass: .5,
        radius: .25,
        contactMaterial: {
            friction: 0.9,
            restitution: 0.7,
            contactEquationStiffness: 1e7,
            contactEquationRelaxation: 1,
            frictionEquationStiffness: 1e7,
            frictionEquationRelaxation: 2,
        }
    },
    tennisRacquetProps: {
        boxArgs: [4, 3, 1],
        contactMaterial: {
            friction: 0.2,
            restitution: 0.7,
            contactEquationStiffness: 1e7,
            contactEquationRelaxation: 1,
            frictionEquationStiffness: 1e7,
            frictionEquationRelaxation: 2,
        }
    },
    hittableSurfaceProps: {
        leftBorder: {
            position: [-12, 0, 0],
            rotation: [0, 0.9, 0],
            color: "aqua",
            boxArgs: [20, 15, 1, 100, 100, 10],
            visible: true,
            contactMaterial: {
                friction: 0.0,
                restitution: 0.7,
                contactEquationStiffness: 1e7,
                contactEquationRelaxation: 1,
                frictionEquationStiffness: 1e7,
                frictionEquationRelaxation: 2,
            }
        },
        rightBorder: {
            position: [12, 0, 0],
            rotation: [0, -0.9, 0],
            color: "chartreuse",
            boxArgs: [20, 15, 1, 100, 100, 10],
            visible: true,
            contactMaterial: {
                friction: 0.0,
                restitution: 0.7,
                contactEquationStiffness: 1e7,
                contactEquationRelaxation: 1,
                frictionEquationStiffness: 1e7,
                frictionEquationRelaxation: 2,
            }
        },
        ground: {
            position: [0, -2, 0],
            rotation: [-Math.PI / 2, 0, 0],
            color: "lightcoral",
            boxArgs: [20, 45, 1, 100, 100, 10],
            visible: false,
            contactMaterial: {
                friction: 0.0,
                restitution: 0.7,
                contactEquationStiffness: 1e7,
                contactEquationRelaxation: 1,
                frictionEquationStiffness: 1e7,
                frictionEquationRelaxation: 2,
            }
        }
    },
    tennisNetProps: {
        position: [0, 0, -2],
        scale: [.5, .1, .00001],
        distance: 1,
        windStrength: 4,
        windStrengthConstant: 80,
        windStrengthTimeDivisor: 100,
        
        // timestep: .001,
    }
}

TRACKS_CONFIG[AummaahTrack.Cricket] = {
    equipmentURL: CRICKET_BAT_GLB,
    startOverSurfacesProps: {
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -10, 0],
        geometryArgs: [250, 250, 20, 20],
    },
    ballProps: {
        position: [0, 10, -5],
        velocity: [0, -8, 5],
        mass: 1,
        radius: .25,
        contactMaterial: {
            friction: 0.1,
            restitution: 0.7,
            contactEquationStiffness: 1e7,
            contactEquationRelaxation: 1,
            frictionEquationStiffness: 1e7,
            frictionEquationRelaxation: 2,
        }
    },
    cricketBatProps: {
        boxArgs: [9, 2, 1],
    },
    cricketWicketProps: {
        leg1: {
            args: [.25, 1.5, .5],
            position: [-.7, 2, -3],
            mass: .1,
        },
        leg2: {
            args: [.25, 1.5, .5],
            position: [0, 2, -3],
            mass: .1,
        },
        leg3: {
            args: [.25, 1.5, .5],
            position: [.7, 2, -3],
            mass: .1,
        },
        topLeft: {
            position: [-.36, 4.8, -3],
            args: [.1, .6, .5],
            rotation: [0, 0, Math.PI / 2],
            mass: .01,
        },
        topRight: {
            position: [.36, 4.8, -3],
            args: [.1, .6, .5],
            rotation: [0, 0, Math.PI / 2],
            mass: .01,
        },
        base: {
            args: [4, -.5, 1],
            position: [0, 0, -3],
            // rotation: [Math.PI/2, 0, 0],
            // visible: false,
        }
    },
    hittableSurfaceProps: {
        leftBorder: {
            position: [-12, 0, 0],
            rotation: [0, 0.9, 0],
            color: "aqua",
            boxArgs: [20, 15, 1, 100, 100, 10],
            visible: true,
            contactMaterial: {
                friction: 0.0,
                restitution: 0.7,
                contactEquationStiffness: 1e7,
                contactEquationRelaxation: 1,
                frictionEquationStiffness: 1e7,
                frictionEquationRelaxation: 2,
            }
        },
        rightBorder: {
            position: [12, 0, 0],
            rotation: [0, -0.9, 0],
            color: "chartreuse",
            boxArgs: [20, 15, 1, 100, 100, 10],
            visible: true,
            contactMaterial: {
                friction: 0.0,
                restitution: 0.7,
                contactEquationStiffness: 1e7,
                contactEquationRelaxation: 1,
                frictionEquationStiffness: 1e7,
                frictionEquationRelaxation: 2,
            }
        },
        ground: {
            position: [0, -2, 0],
            rotation: [-Math.PI / 2, 0, 0],
            color: "lightcoral",
            boxArgs: [20, 45, 1, 100, 100, 10],
            visible: true,
            contactMaterial: {
                friction: .2,
                restitution: 0.7,
                contactEquationStiffness: 1e7,
                contactEquationRelaxation: 1,
                frictionEquationStiffness: 1e7,
                frictionEquationRelaxation: 2,
            }
        }
    }

}


TRACKS_CONFIG[AummaahTrack.Golf] = {
    equipmentURL: GOLF_CLUB_GLB,

    startOverSurfacesProps: {
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -10, 0],
    },
    ballProps: {
        position: [0, 5, 9.5],
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
        leftBorder: {
            position: [-12, 0, 0],
            rotation: [0, 0, 0],
            color: "aqua",
            boxArgs: [20, 15, 1, 100, 100, 10],
            visible: true,
            contactMaterial: {
                friction: 0.0,
                restitution: 0.7,
                contactEquationStiffness: 1e7,
                contactEquationRelaxation: 1,
                frictionEquationStiffness: 1e7,
                frictionEquationRelaxation: 2,
            }
        },
        rightBorder: {
            position: [12, 0, 0],
            rotation: [0, 0, 0],
            color: "chartreuse",
            boxArgs: [20, 15, 1, 100, 100, 10],
            visible: true,
            contactMaterial: {
                friction: 0.0,
                restitution: 0.7,
                contactEquationStiffness: 1e7,
                contactEquationRelaxation: 1,
                frictionEquationStiffness: 1e7,
                frictionEquationRelaxation: 2,
            }
        },

    },
    groundProps: {
        position: [0, -1, 0],
        rotation: [-Math.PI / 2, 0, 0],
        color: "lightcoral",
        // boxArgs: [20, 45, 1, 100, 100, 10],
        visible: true,
        contactMaterial: {
            // friction: 100,
            // restitution: 0,
            // contactEquationStiffness: 1e7,
            // contactEquationRelaxation: 1,
            // frictionEquationStiffness: 1e7,
            // frictionEquationRelaxation: 2,
        }
    },
    golfClubProps: {
        poleArgs: [.3, 1.5, .2],
        positionY: 1,
        positionZ: 10,
        contactMaterial: {
            friction: 0,
            restitution: 0.1,
            contactEquationStiffness: 1e7,
            contactEquationRelaxation: 1,
            frictionEquationStiffness: 1e7,
            frictionEquationRelaxation: 2,
        }
    },
    golfTeeProps: {
        position: [0, .5, 9.5],
        boxArgs: [.05, .25, .015],
        type: "Kinematic",
        color: "white",
    },
    golfClubMoundProps: [
        {
            position: [-5, 3, -2],
            //rotation: [0.1, 0.2, 0.1],
            sides: 3,
            scale: [5, 3, 5],
            contactMaterial: {
                // friction: 100,
                // restitution: 0,
                // contactEquationStiffness: 1e7,
                // contactEquationRelaxation: 1,
                // frictionEquationStiffness: 1e7,
                // frictionEquationRelaxation: 2,
            }
        },
        {
            position: [10, 5, -50],
            //rotation: [0.5, 0.1, 0.1],
            sides: 8,
            scale: [10, 5, 10]
        }
    ],
    flagProps: {
        position: [-5, 3, -2],
        scale: [.04, .03, .00001],
        distance: 1,
        windStrength: 3,
        windStrengthConstant: 800,
        windStrengthTimeDivisor: 100,
        
        // timestep: .001,
    }


}
