attribute vec3 next;
attribute vec3 prev;
attribute float side;

uniform vec2 uResolution;
uniform float uDPR;
uniform float uThickness;

vec4 getPosition() {
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1);
  vec2 nextScreen = next.xy * aspect;
  vec2 prevScreen = prev.xy * aspect;

  vec2 tangent = normalize(nextScreen - prevScreen);
  vec2 vNormal = vec2(-tangent.y, tangent.x);
  vNormal /= aspect;
  vNormal *= 1.0 - pow(abs(uv.y - 0.5) * 1.9, 2.0);

  float pixelWidth = 1.0 / (uResolution.y / uDPR);
  vNormal *= pixelWidth * uThickness;

  // When the points are on top of each other, shrink the line to avoid artifacts.
  float dist = length(nextScreen - prevScreen);
  vNormal *= smoothstep(0.0, 0.02, dist);

  vec4 current = vec4(position, 1);
  current.xy -= vNormal * side;
  return current;
}

void main() {
  gl_Position = getPosition();
}