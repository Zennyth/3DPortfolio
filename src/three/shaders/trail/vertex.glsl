attribute vec3 next;
attribute vec3 prev;
attribute float side;

uniform vec2 uResolution;
uniform float uThickness;

vec4 getPosition() {
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1);
  // vec2 nextScreen = next.xy * aspect;
  // vec2 prevScreen = prev.xy * aspect;

  // vec2 tangent = normalize(nextScreen - prevScreen);
  // vec2 normal = vec2(-tangent.y, tangent.x);
  // normal /= aspect;
  // normal *= 0.1;

  vec4 current = vec4(position, 1.);
  current.xy -= normal.xy / aspect * .1;
  return current;
}

void main() {
  gl_Position = getPosition();
}