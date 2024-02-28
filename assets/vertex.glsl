uniform float time;
varying vec2 vUv;
varying float uTime;

void main() {

  vUv = uv;
  uTime = time;

  vec3 newPosition = position;
  newPosition.z = 1.0 * sin(newPosition.x * 1.0 + time);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}