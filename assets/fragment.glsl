precision mediump float;

varying vec2 vUv;
varying float uTime;

void main() {
    vec3 color1 = vec3(0.0, 0.0, 1.0);
    vec3 color2 = vec3(0.0, 0.0, 0.0);

    float blendFactor = smoothstep(0.0, 1.0, vUv.x);
    vec3 blendedColor = mix(color1, color2, blendFactor);

    gl_FragColor = vec4(blendedColor, 1.0);
}
