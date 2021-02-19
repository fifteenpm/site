import niceColors from "nice-color-palettes";

console.log(niceColors)
const COLORS = niceColors[99];

export const BLOB = COLORS[0];
export const CUBES = BLOB;
export const FRONT = COLORS[0];
export const BACK = COLORS[0];
export const LIGHTS = [
  {
    id: 0,
    color: 0xff0000
  },
  {
    id: 1,
    color: 0x00ff00
  },
  {
    id: 2,
    color: 0x0000ff
  }
];

export const IS_MOBILE = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
export const VERTICES_NUM = 64 * (IS_MOBILE ? 1 : 2);

export function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export function perlin3() {
      // ##### Perlin noise stuff
  
      function fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
      }
    
      function lerp(a, b, t) {
        return (1 - t) * a + t * b;
      }
  
    
      // 3D Perlin Noise
      return function(x, y, z) {
        // Find unit grid cell containing point
        var X = Math.floor(x),
          Y = Math.floor(y),
          Z = Math.floor(z);
        // Get relative xyz coordinates of point within that cell
        x = x - X;
        y = y - Y;
        z = z - Z;
        // Wrap the integer cells at 255 (smaller integer period can be introduced here)
        X = X & 255;
        Y = Y & 255;
        Z = Z & 255;
    
        // Calculate noise contributions from each of the eight corners
        var n000 = gradP[X + perm[Y + perm[Z]]].dot3(x, y, z);
        var n001 = gradP[X + perm[Y + perm[Z + 1]]].dot3(x, y, z - 1);
        var n010 = gradP[X + perm[Y + 1 + perm[Z]]].dot3(x, y - 1, z);
        var n011 = gradP[X + perm[Y + 1 + perm[Z + 1]]].dot3(x, y - 1, z - 1);
        var n100 = gradP[X + 1 + perm[Y + perm[Z]]].dot3(x - 1, y, z);
        var n101 = gradP[X + 1 + perm[Y + perm[Z + 1]]].dot3(x - 1, y, z - 1);
        var n110 = gradP[X + 1 + perm[Y + 1 + perm[Z]]].dot3(x - 1, y - 1, z);
        var n111 = gradP[X + 1 + perm[Y + 1 + perm[Z + 1]]].dot3(
          x - 1,
          y - 1,
          z - 1
        );
    
        // Compute the fade curve value for x, y, z
        var u = fade(x);
        var v = fade(y);
        var w = fade(z);
    
        // Interpolate
        return lerp(
          lerp(lerp(n000, n100, u), lerp(n001, n101, u), w),
          lerp(lerp(n010, n110, u), lerp(n011, n111, u), w),
          v
        );
      };
}