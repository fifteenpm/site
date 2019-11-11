
varying vec2 vUv;


// RGB to YUV matrix

void main() {
    
  // vec2 st = gl_FragCoord.xy/vUv.xy;

  vec3 color2 = vec3(1.0,0.55,0);
  vec3 color1 = vec3(0.226,0.000,0.615);
  // vec3 color3 = color1;
  // vec3 color4 = color2;

  float mixValue = distance(vUv,vec2(.5,.5));
  vec3 color = mix(color1,color2,mixValue);

  gl_FragColor = vec4(color,mixValue);
 
}
