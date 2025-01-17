import * as THREE from 'three';
import {
  ArrowKeys, Click, Hover,
  MouseMove,



  NoPhone,
  SlowLoad, TwoFingerScroll
} from "./Common/UI/Controls/Icons";
import { multiSourceVideo } from './Common/Video/paths.js';


export const CONTENT = {
  "/": {
    home: true, // TODO (jeremy) rm
    // TODO (jeremy) punting on a cleaner solution to handling circular navigation arrows. This just needs to be defined in first and last navigation steps (so, home, and latest release.)
    lastIdx: 13,
    message:
      "Welcome to fifteen.pm. We hope you enjoy your stay.",
    colors: {
      logo: 'white',
      overlayContent: 'white',
      overlay: 'rgba(0, 50, 200, 0.9)',
      navigation: 'white',
      onHover: 'rgba(0, 0, 0, 0.5)',
      info: 'white',
    }
  },
  "/1": {
    artist: "YAHCEPH",
    message: 'Yahceph\'s production debut, "wun 4 jas", is composed of voice memos and buoyant pads floating somewhere between him and Jasmine, the namesake of this ode.',
    purchaseLink: "https://fifteenpm.bandcamp.com/album/yahceph-wun-4-jas",
    tracks: [
      {
        name: "Wun 4 Jas",
        // id: "466084773",
        type: "s3",
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/yah3b08e",
      }
    ],
    colors: {
      logo: '#fff',
      overlay: 'rgba(255,105,180, 1)',
      overlayContent: '#fff',
      player: 'rgba(255,105,180, 1)',
      navigation: 'rgba(255,105,180, 1)',
      onHover: '#fff',
      info: 'rgba(255,105,180, 1)',
    },
    instructions: [
      {
        icon: MouseMove,
        text: "move mouse to make water ripple"
      }
    ]
  },
  "/2": {
    artist: "YEAR UNKNOWN",
    message: "Jen Fong (Year Unknown) serves up frenetic, glitch-fueled footwork on this otherworldly drum disturbance.",
    purchaseLink: "https://fifteenpm.bandcamp.com/track/timer",
    tracks: [
      {
        name: "Timer",
        // id: "475418370",
        type: "s3",
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/yu102ea",
      }
    ],
    colors: {
      logo: 'white',
      overlayContent: 'white',
      overlay: 'rgba(127, 0, 255, 0.5)',
      player: 'white',
      navigation: 'white',
      onHover: 'rgba(240, 0, 255, 0.75)',
      info: 'white',
      instructions: [
        {
          icon: MouseMove,
          text: "click and drag mouse to look around"
        },
        {
          icon: TwoFingerScroll,
          text: "scroll to zoom"
        }
      ]
    }
  },
  "/3": {
    artist: "OTHERE",
    message:
      "Abbi Press makes buoyant, soul-inflected tunes by day. As Othere, she explores the darker, corporeal corners of her sound.",
    purchaseLink: "https://fifteenpm.bandcamp.com/track/lets-beach",
    tracks: [
      {
        name: "Let's Beach",
        // id: "482138307",
        type: "s3",
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/ot25afe3",
      }
    ],
    colors: {
      logo: 'red',
      player: 'red',
      overlay: 'red',
      overlayContent: 'white',
      navigation: 'red',
      onHover: 'gray',
      info: 'red',
    },
    instructions: [
      {
        icon: Hover,
        text: "hover over inner orb to activate filter"
      },
      {
        icon: MouseMove,
        text: "click and drag mouse to look around"
      },
      {
        icon: TwoFingerScroll,
        text: "scroll to zoom and fly through filter"
      }
    ]
  },
  "/4": {
    artist: "JON CANNON",
    message: "Jon Cannon's haunting house ballads are a product of his habitat: the long drag of Myrtle-Broadway where fluorescent-lit stores stock life's essentials.",
    purchaseLink: "https://fifteenpm.bandcamp.com/album/ep-1",
    tracks: [
      {
        name: "Nothing (Blood)",
        // id: "507660189",
        type: "s3",
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/jc1123ref"
      },
      {
        name: "Miracle Center",
        // id: "513518607",
        type: "s3",
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/jc3mc29a",
      },
      {
        name: "Finesse",
        // id: "513518595",
        type: "s3",
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/jc2fn41l",
      }
    ],
    colors: {
      logo: '#fff',
      overlayContent: '#fff',
      overlay: 'rgba(0, 0, 0, 0.5)',
      player: '#fff',
      navigation: '#fff',
      onHover: 'rgba(250, 10, 250)',
      info: '#fff',
    },
    instructions: [
      {
        icon: MouseMove,
        text: "move mouse to look around"
      },
      {
        icon: Click,
        text: "click to advance flight path"
      },
      {
        icon: ArrowKeys,
        text: "use arrow keys to fly around"
      },
      {
        icon: NoPhone,
        text: "doesn't work on phones",
        alwaysShow: true
      }
    ]

  },
  "/5": {
    artist: "PLEBEIAN",
    message: "Plebeian’s toolbox rattles with chains, ball-bearings and loose screws on these slammin’ single-takes of industrial techno.",
    purchaseLink: "https://fifteenpm.bandcamp.com/album/heaven",
    tracks: [
      {
        name: "Heaven",
        id: "514219014",
        type: "s3",
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/p1h332a"
      },
      {
        name: "Bullseye",
        // id: "514219020",
        type: "s3",
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/p2be232a"
      }
    ],
    colors: {

      logo: '#fff',
      overlayContent: '#fff',
      overlay: 'rgba(40, 47, 175, 1)',
      player: '#fff',
      navigation: 'rgba(40, 47, 175, 1)',
      onHover: 'rgba(40, 47, 175, 1)',
      info: '#fff',
    },
    instructions: [
      {
        icon: MouseMove,
        text: "click and drag mouse to look around"
      },
      {
        icon: TwoFingerScroll,
        text: "scroll to zoom"
      }
    ]
  },
  "/6": {
    artist: "VVEISS",
    message: "Dagger at the ready, vveiss plumbs virtual depths, carving out a subsonic ceremony of refracting rhythms.",
    purchaseLink: "https://fifteenpm.bandcamp.com/track/escape-velocity",
    tracks: [
      {
        name: "ESCAPE VELOCITY",
        // id: "529074519",
        type: "s3",
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/vv19a2",
      }
    ],
    colors: {
      logo: '#fff',
      overlay: 'rgba(127, 0, 255, 0.4)',
      overlayContent: '#fff',
      player: 'rgba(127, 0, 255, 0.4)',
      navigation: 'rgba(250, 0, 255, 0.4)',
      onHover: 'rgba(127, 0, 255, 0.4)',
      info: 'rgba(127, 0, 255, 0.4)',
    },
    instructions: [
      {
        icon: MouseMove,
        text: "move mouse to look around"
      }
    ]
  },
  "/7": {
    artist: "JON FAY",
    message: "In this 22-minute meditation, Jon Fay captures the infinite pulse of the rave as it empties into the dawn.",
    purchaseLink: "https://fifteenpm.bandcamp.com/track/golden-groove",
    tracks: [
      {
        name: "GOLDEN GROOVE",
        id: "565459281",
        type: "s3",
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/jf19aek",
      }
    ],
    colors: {
      logo: '#fff',
      overlayContent: '#fff',
      overlay: 'rgba(255, 102, 0, 0.4)',
      player: 'rgba(255, 102, 0, 0.4)',
      navigation: 'rgba(255, 102, 0, 0.4)',
      onHover: 'rgba(255, 102, 0, 0.4)',
      info: 'rgba(255, 102, 0, 0.4)',
    },
    instructions: [
      {
        icon: SlowLoad,
        text: "takes a few seconds to load"
      },
      {
        icon: ArrowKeys,
        text: "use arrow keys to walk forever"
      },
      {
        icon: MouseMove,
        text: "move mouse to look around"
      },
      {
        icon: NoPhone,
        text: "doesn't work on phones",
        alwaysShow: true
      }
    ]
  },
  "/greem-and-fifteenpm-opening": {
    artist: "",
    tracks: [
      {
        title: "",
        type: "s3",
        id: "610976673",
        secretToken: "s-7EwJv"
      }
    ],
    theme: {
      message: "DUR DUR DUR DUR DUR DUR DUR DUR",
      purchaseLink: "https://fifteenpm.bandcamp.com/track/golden-groove",
      iconColor: '#fff',
      fillColor: 'rgba(255, 0, 0, 0.5)',
      textColor: '#fff',
      navColor: '#fff',
      controls: []
    }
  },
  "/8": {
    artist: "GREEM JELLYFISH",
    message: "Juicy Tender is an exploration of exodus and urban life. Though we leave the city in search of extraordinary experiences, we sometimes return to loneliness. Ultimately, refuge is not a place but a set of material conditions: Art, Food, Music, Mountain, Ocean, Family, Friend.",
    purchaseLink: "https://fifteenpm.bandcamp.com/album/juicy-tender",
    tracks: [
      {
        sources: {
          nonHLS: multiSourceVideo('/assets/8/videos/jt-final'),
        },
        mediaType: 'video',
        props: {
          type: 'video', // TODO do we need this here as well?
          mimetype: 'video/mp4',
          name: 'greem-vid1',
          geometry: new THREE.PlaneBufferGeometry(1, 1),
          position: [0, 0, 0],
          playbackRate: 1,
          loop: true,
          invert: true,
          volume: .4,
          muted: false,
          angle: 0.0,
        },
        mesh: undefined,
      },
    ],
    colors: {
      logo: '#fff',
      overlay: 'rgba(255, 0, 0, 0.5)',
      overlayContent: '#fff',
      player: '#fff',
      navigation: '#fff',
      onHover: 'rgba(255, 0, 0, 0.5)',
      info: '#fff',
    },
    instructions: [{
      icon: MouseMove,
      text: "click and drag mouse to look around"
    },
    {
      icon: TwoFingerScroll,
      text: "scroll to zoom"
    }]
  },
  "/g": {
    artist: "",
    tracks: [
      {
        title: "",
        type: "s3",
        id: "610976673",
        secretToken: "s-7EwJv"
      }
    ],
    theme: {
      message: "DUR DUR DUR DUR DUR DUR DUR DUR",
      purchaseLink: "https://fifteenpm.bandcamp.com/track/golden-groove",
      iconColor: '#fff',
      fillColor: 'rgba(255, 0, 0, 0.5)',
      textColor: '#fff',
      navColor: '#fff',
      controls: []
    }
  },
  "/9": {
    artist: "JAVONNTTE",
    message: "Detroit Asteroid Belt 2120: All sectors go wild for the Earthy tones of house master Javonntte after his 'City Life' series surfaces off some de-bricked drives in the archives.",
    purchaseLink: "https://fifteenpm.bandcamp.com/album/city-life",
    tracks: [
      {
        name: "City Life",
        type: "s3",
        id: "742019866",
        secretToken: "s-7AotY",
        bpm: "120",
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/jv1cla3ed",
      },
      {
        name: "S.H.M.",
        type: "s3",
        id: "742019875",
        secretToken: "s-dKlsb",
        bpm: "120",
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/jv2sh2a",
      },
      {
        name: "Natural",
        type: "s3",
        id: "742019860",
        secretToken: "s-gLrd3",
        bpm: "120",
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/jv3nae3fd",
      },
      {
        name: "This Dream",
        type: "s3",
        id: "742019854",
        secretToken: "s-h4Las",
        bpm: "95",
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/jv4td2alef",
      },


    ],
    colors: {
      logo: '#0f0',
      navigation: '#0f0',
      overlay: 'rgba(0, 255, 0, .8)',
      overlayContent: '#000',
      player: '#0f0',
      onHover: '#fff',
      info: '#0f0',
    },
    instructions: [
      {
        icon: ArrowKeys,
        text: "use arrow keys to drive the hoverboard"
      },
    ],
  },
  "/10": {
    artist: "Alien D",
    message: "Dan Creahan of Sweat Equity takes us on a hypnotic, chugging ride through the digital murk",
    purchaseLink: "https://fifteenpm.bandcamp.com/album/jazzin-the-cube",
    tracks: [
      {
        name: "Cube Jazz",
        type: "s3",
        id: "708031996",
        secretToken: "s-f0NWB",
        bpm: 152,
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/ad1cj2ae3f",
      },
      {
        name: "Frog Shirt",
        type: "s3",
        id: "708031990",
        secretToken: "s-NKawM",
        bpm: 112,
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/ad2fsegh49",
      },
      {
        name: "Show U",
        type: "s3",
        id: "708031987",
        secretToken: "s-BnEVI",
        bpm: 110,
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/ad3sue68",
      },
    ],
    colors: {
      logo: "white",
      overlayContent: "white",
      overlay: "rgba(0, 0, 0, 0.5)",
      navigation: "white",
      player: "white",
      onHover: "red",
      info: "white"
    },
    instructions: [
      {
        icon: MouseMove,
        text: "click and drag mouse to rotate around the cube"
      },
      {
        icon: Hover,
        text: 'mouse over frogs to make noise'
      },
      {
        icon: ArrowKeys,
        text: 'use arrows to move around'
      },
      {
        icon: TwoFingerScroll,
        text: "scroll to zoom"
      }
    ]
  },
  "/11": {
    artist: "JWORDS",
    message: "A 3D scan of JWords headspace from the tail-end of pre-Covid times. Watch it go to dust, and come into being again.",
    purchaseLink: "https://fifteenpm.bandcamp.com/album/dancepackvol-2",
    instructions: [
      {
        icon: TwoFingerScroll,
        text: "scroll the headspace"
      },
    ],
    colors: {
      logo: '#0f0',
      navigation: '#0f0',
      overlay: 'rgba(0, 255, 0, .8)',
      overlayContent: '#000',
      player: '#0f0',
      onHover: '#fff',
      info: '#0f0',
    },
    tracks: [
      {
        name: "Remedy",
        type: "s3",
        id: "832516708",
        secretToken: "s-90RRPxAlMoP",
        bpm: 136,
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/jw14ga4g",
      },
      {
        name: "Fear",
        type: "s3",
        id: "832516702",
        secretToken: "s-WYBrSlRSqz8",
        bpm: 140,
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/jw2asgf23",
      },
      {
        name: "Radio Freak",
        type: "s3",
        id: "832516690",
        secretToken: "s-WFObAbCzVsZ",
        bpm: 138,
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/jw3a4ga",
      },
    ],
  },
  "/12": {
    artist: "HEIDI SABERTOOTH",
    message: "Heidi Sabertooth and her interstellar crew of elektroid beings warp the space-time catwalk to the power of two electro-acid supernovas and a zero-g ambient closer.",
    purchaseLink: "https://fifteenpm.bandcamp.com/album/inside-out-ep",
    tracks: [
      {
        name: "Inside Out",
        type: "s3",
        id: "862855786",
        secretToken: "s-jBUPqKXtkmh",
        bpm: 128,
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/hs1aw6",
      },
      {
        name: "High On Mate",
        type: "s3",
        id: "862855783",
        secretToken: "s-8Ac9QyayEtV",
        bpm: 130,
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/hs2a3ka43f",
      },
      {
        name: "Looking For Roses",
        type: "s3",
        id: "862855780",
        secretToken: "s-krM6xurN6cV",
        bpm: 126,
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/hs39af3",
      },
    ],
    colors: {
      logo: "white",
      overlayContent: "white",
      overlay: "rgba(0, 0, 0, 0.5)",
      navigation: "white",
      player: "white",
      onHover: "red",
      info: "white"
    },
    instructions: [
      {
        icon: MouseMove,
        text: "click and drag mouse to look around"
      },
      {
        icon: TwoFingerScroll,
        text: "scroll to zoom"
      }
    ]
  },
  "/13": {
    artist: "ISN'T OURS",
    message: "Rest in the womb of \"Laurel Leaves\", a new EP by Isn't Ours, where the cold galaxy is outside, and we're safe in here. With video by Arrien Zinghini.",
    purchaseLink: "https://fifteenpm.bandcamp.com/album/laurel-leaves-2",
    purchaseLinkText: "Buy the album",
    instructions: [
      {
        icon: MouseMove,
        text: "look around"
      },
    ],
    colors: {
      logo: '#ff6d05',
      navigation: '#ff6d05',
      overlay: 'rgba(255, 109, 5, .7)',
      overlayContent: '#fff',
      player: '#ff6d05',
      onHover: '#ff0000',
      info: '#ff6d05',
    },
    videoTracks: [
      {
        sources: {
          hls: '/assets/13/videos/hls/master.m3u8',
          nonHLS: multiSourceVideo('/assets/13/videos/mobile/2x270'),
        },
      },
    ],
    tracks: [
      {
        name: "The End",
        type: "s3",
        id: "859113487",
        secretToken: "s-KdSdKTQyHUc",
        bpm: 136,
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/io1tea4fa",
      },
      {
        name: "It's Kept from Us",
        type: "s3",
        id: "859113490",
        secretToken: "s-KJdW92duKGe",
        bpm: 140,
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/io2ikf46aed",
      },
      {
        name: "Close Behind",
        type: "s3",
        id: "859113601",
        secretToken: "s-VpF7Njg8UuI",
        bpm: 138,
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/io3cb4a92",
      },
      {
        name: "Laurel Leaves",
        type: "s3",
        id: "859113565",
        secretToken: "s-FROHSHngifQ",
        bpm: 138,
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/io4l25a4ef",
      },
    ],
  },
  "/14": {
    artist: "AUMMAAH",
    // todo (jeremy) fix this navigation hack
    lastIdx: 14,
    message: "Play 🎾 games 🏏 with ⛳ Aummaah.",
    purchaseLink: "https://fifteenpm.bandcamp.com/album/aummaah-games-ep",
    tracks: [
      {
        name: "Tennis",
        type: "s3",
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/au1t53f2fe",
      },
      {
        name: "Cricket",
        type: "s3",
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/au2c3a20d",
      },
      {
        name: "Golf",
        type: "s3",
        url: "https://s3.amazonaws.com/fifteen.pm/aef315/au3g3b08e",
      },
    ],
    colors: {
      logo: "white",
      overlayContent: "white",
      overlay: "rgba(0, 0, 0, 0.5)",
      navigation: "white",
      player: "white",
      onHover: "red",
      info: "white"
    },
    instructions: [
      {
        icon: MouseMove,
        text: "one finger to play the games"
      },
      {
        icon: TwoFingerScroll,
        text: "two fingers to look around"
      }
    ]
  }
};

/*
For devving, easy to swap in:
tracks: [
      { // These tracks are useful for devving on the player
        title: "Fake short song 1",
        id: "58432359" //287949388"
      },
      {
        title: "Fake short song 2",
        id: "177365673"
      },
      {
        title: "Fake short song 3",
        id: "177365185"
      },
      {
        title: "Fake short song 4",
        id: "177364838"
      }
],
*/
