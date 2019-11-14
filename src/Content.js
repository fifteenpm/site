import {
  Hover,
  MouseMove,
  Click,
  TwoFingerScroll,
  ArrowKeys,
  NoPhone,
  SlowLoad
} from "./UI/Controls/Icons";

import { assetPath } from "./Utils/assets";

export const LOGO_SVG_FILL_COLOR_BY_INDEX = {
  "/1": "#FF69B4",
  "/3": "red"
}

export const TOTAL_RELEASES = 9;

export const CONTENT = {
  "/": {
    home: true, // TODO rm
    message:
      "fifteen.pm invites musicians to expand their visions through the collaborative development of experimental websites. Curated by artists and technologists in New York City, the collective creates experiences of meaning and specificity online, in opposition to the internet of platforms, templates, and streams. Responding to music with multisensory worlds, each release imagines a new space for sound.",
    colors: {
      logo: 'white',
      overlayContent: 'white',
      overlay: 'rgba(0, 255, 0, 0.5)',
      onHover: 'rgba(0, 0, 0, 0.5)',
    }
  },
  "/1": {
    artist: "YAHCEPH",
    message: 'Yahceph\'s production debut, "wun 4 jas", is composed of voice memos and buoyant pads floating somewhere between him and Jasmine, the namesake of this ode.',
    purchaseLink: "https://fifteenpm.bandcamp.com/track/wun-4-jas",
    tracks: [
      {
        title: "Wun 4 Jas",
        id: "466084773",
        type: "soundcloud"
      }
    ],
    colors: {
      logo: '#fff',
      overlay: 'rgba(255,105,180, 1)',
      overlayContent: '#fff',
      player: 'rgba(255,105,180, 1)',
      onHover: '#fff',
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
        id: "475418370",
        type: "soundcloud"
      }
    ],
    colors: {
      logo: 'white',
      overlayContent: 'white',
      overlay: 'rgba(127, 0, 255, 0.5)',
      player: 'rgba(127, 0, 255, 0.5)',
      onHover: 'rgba(240, 0, 255, 0.75)',
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
        id: "482138307",
        type: "soundcloud"
      }
    ],
    colors: {
      logo: 'red',
      player: 'red',
      overlay: 'red',
      overlayContent: 'white',
      onHover: 'gray',
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
    }
  },
  "/4": {
    artist: "JON CANNON",
    message: "Jon Cannon's haunting house ballads are a product of his habitat: the long drag of Myrtle-Broadway where fluorescent-lit stores stock life's essentials.",
    purchaseLink: "https://fifteenpm.bandcamp.com/album/ep-1",
    tracks: [
      {
        title: "Nothing (Blood)",
        id: "507660189",
        type: "soundcloud"
      },
      {
        title: "Miracle Center",
        id: "513518607",
        type: "soundcloud"
      },
      {
        title: "Finesse",
        id: "513518595",
        type: "soundcloud"
      }
    ],
    colors: {
      logo: '#fff',
      overlayContent: '#fff',
      overlay: 'rgba(0, 0, 0, 0.5)',
      player: 'rgba(0, 0, 0, 0.5)',
      onHover: '#fff', 
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
    textModel: assetPath("5/objects/text.gltf"),
    tracks: [
      {
        title: "Heaven",
        id: "514219014",
        type: "soundcloud"
      },
      {
        title: "Bullseye",
        id: "514219020",
        type: "soundcloud"
      }
    ],
    theme: {
      message:
        "Plebeian’s toolbox rattles with chains, ball-bearings and loose screws on these slammin’ single-takes of industrial techno.",
      purchaseLink: "https://fifteenpm.bandcamp.com/album/heaven",
      iconColor: '#fff',
      fillColor: 'rgba(40, 47, 175, 1)',
      textColor: '#fff',
      navColor: '#fff',
      controls: [
        {
          icon: MouseMove,
          instructions: "click and drag mouse to look around"
        },
        {
          icon: TwoFingerScroll,
          instructions: "scroll to zoom"
        }
      ]
    }
  },
  "/6": {
    artist: "VVEISS",
    textModel: assetPath("6/objects/text.gltf"),
    tracks: [
      {
        title: "ESCAPE VELOCITY",
        id: "529074519",
        type: "soundcloud"
      }
    ],
    theme: {
      message:
        "Dagger at the ready, vveiss plumbs virtual depths, carving out a subsonic ceremony of refracting rhythms.",
      purchaseLink: "https://fifteenpm.bandcamp.com/track/escape-velocity",
      iconColor: '#fff',
      fillColor: 'rgba(127, 0, 255, 0.4)',
      textColor: '#fff',
      navColor: '#fff',
      controls: [
        {
          icon: MouseMove,
          instructions: "move mouse to look around"
        }
      ]
    }
  },
  "/7": {
    artist: "JON FAY",
    message: "In this 22-minute meditation, Jon Fay captures the infinite pulse of the rave as it empties into the dawn.",
    purchaseLink: "https://fifteenpm.bandcamp.com/track/golden-groove",
    tracks: [
      {
        title: "GOLDEN GROOVE",
        id: "565459281",
        type: "soundcloud"
      }
    ],
    colors: {
      logo: '#fff',
      overlayContent: '#fff',
      overlay: 'rgba(255, 102, 0, 0.4)',
      player: 'rgba(255, 102, 0, 0.4)',
      onHover: 'rgba(255, 102, 0, 0.4)',
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
        type: "soundcloud",
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
    tracks: [
      {
        title: "Juicy Tender",
        type: "soundcloud",
        id: "610976673",
        secretToken: "s-7EwJv",
        // id: "629673933",
        // secretToken: "s-Pga8Z"
      }
    ],
    theme: {
      message: "Juicy Tender is an exploration of exodus and urban life. Though we leave the city in search of extraordinary experiences, we sometimes return to loneliness. Ultimately, refuge is not a place but a set of material conditions: Art, Food, Music, Mountain, Ocean, Family, Friend.",
      purchaseLink: "https://fifteenpm.bandcamp.com/album/juicy-tender",
      iconColor: '#fff',
      fillColor: 'rgba(255, 0, 0, 0.5)',
      textColor: '#fff',
      navColor: '#fff',
      controls: [{
        icon: MouseMove,
        instructions: "click and drag mouse to look around"
      },
      {
        icon: TwoFingerScroll,
        instructions: "scroll to zoom"
      },
      ]
    }
  },
  "/g": {
    artist: "",
    tracks: [
      {
        title: "",
        type: "soundcloud",
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
    message: "In the year 4182 all of Detroit Cloud City goes wild for City Lights, an early 21st century EP by Javonntte pulled off some bricked drives in the archives.",
    purchaseLink: "TODO",
    tracks: [
      {
        name: "City Life",
        type: "soundcloud",
        id: "679771262",
        secretToken: "s-pqcS4",
        bpm: "120",
      },
      {
        name: "Swing House Madness",
        type: "soundcloud",
        id: "693475855",
        secretToken: "s-qakud",
        bpm: "120",
      },
      {
        name: "Natural",
        type: "soundcloud",
        id: "679771259",
        secretToken: "s-W6P06",
        bpm: "120",
      },
      {
        name: "This Dream",
        type: "soundcloud",
        id: "679771253",
        secretToken: "s-XeIko",
        bpm: "95",
      },

    ],
    colors: {
      logo: '#0f0',
      overlay: '#0f0',
      overlayContent: '#fff',
      player: '#0f0',
      onHover: '#fff9',
    },
    instructions: [
      {
        icon: ArrowKeys,
        text: "use arrow keys to drive the hoverboard"
      },
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
