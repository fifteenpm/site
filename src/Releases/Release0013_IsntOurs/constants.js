import * as THREE from 'three';
import { assetPath } from "../../Common/Utils/assets";

// video 
export const ROOM_OBJECT = assetPath("13/objects/main.glb")
export const HLS_URL = assetPath("13/videos/hls/master.m3u8")
export const MP4_URL = assetPath("13/videos/mobile/2x270.mp4")
export const WEBM_URL = assetPath("13/videos/mobile/2x270.webm")
export const VIDEO_DIMENSIONS = {
  x: 21,
  y: 9,
}

// tracks
export const THE_END = "The End"
export const ITS_KEPT_FROM_US = "It's Kept from Us"
export const CLOSE_BEHIND = "Close Behind"
export const LAUREL_LEAVES = "Laurel Leaves"

export const FIRST_TRACK = THE_END
// steps per track

// TODO (jeremy) not using atm...
export const TRACKS_CONFIG = {}
TRACKS_CONFIG[THE_END] = {
  steps: [
    { time: 0, camera: new THREE.Vector3(0, 0, 7.4) },
    { time: 6, camera: new THREE.Vector3(0, 0, 0) },
    { time: 8 },
    { time: 14 },
    { time: 21 },
    { time: 35 },
    { time: 42 },
    { time: 49 },
    { time: 63 },
    { time: 70 },
    { time: 75 },
    { time: 91 },
    { time: 176 }
  ]
}
TRACKS_CONFIG[ITS_KEPT_FROM_US] = {
  steps: [
    { time: 0 },
    { time: 6 },
    { time: 8 },
    { time: 14 },
    { time: 21 },
    { time: 35 },
    { time: 42 },
    { time: 49 },
    { time: 63 },
    { time: 70 },
    { time: 75 },
    { time: 91 },
    { time: 176 }
  ]
}
TRACKS_CONFIG[CLOSE_BEHIND] = {
  steps: [
    { time: 0 },
    { time: 6 },
    { time: 8 },
    { time: 14 },
    { time: 21 },
    { time: 35 },
    { time: 42 },
    { time: 49 },
    { time: 63 },
    { time: 70 },
    { time: 75 },
    { time: 91 },
    { time: 176 }
  ]
}
TRACKS_CONFIG[LAUREL_LEAVES] = {
  steps: [
    { time: 0 },
    { time: 6 },
    { time: 8 },
    { time: 14 },
    { time: 21 },
    { time: 35 },
    { time: 42 },
    { time: 49 },
    { time: 63 },
    { time: 70 },
    { time: 75 },
    { time: 91 },
    { time: 176 }
  ]
}
//
