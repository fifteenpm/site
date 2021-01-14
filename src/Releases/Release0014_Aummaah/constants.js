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

export const FIRST_TRACK = AummaahTrack.Tennis
export const TRACKS_CONFIG = {}

TRACKS_CONFIG[AummaahTrack.Tennis] = {
    steps: [
        {
         
        }
        // },
        // {
        //     time: 1,
        //     color1: "green",
        //     color2: 0x023000,
        //     light1: {
        //         color: "yellow",
        //     },
        //     light2: {
        //         color: "magenta",
        //     },
        //     accentColor: 0x893801,
        //     bloomFilter: {
        //         radius: 1,
        //         threshold: 0,
        //         exposure: .1,
        //         strength: 1,
        //     }
        // }
    ]
}

TRACKS_CONFIG[AummaahTrack.Cricket] = {

}


TRACKS_CONFIG[AummaahTrack.Golf] = {
    steps: [
        {
            step: AummaahTrack.Golf,
            time: 0,
            bloomFilter: {
                radius: 0,
                strength: 2,
            },
            color1: "blue",
            color2: "magenta",
            light1: {
                color: "yellow",
            },
            light2: {
                color: "magenta",
            },
        }
    ]
} 
