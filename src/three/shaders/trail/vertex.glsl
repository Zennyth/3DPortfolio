attribute vec3 position;
attribute vec3 next;
attribute vec3 prev;
attribute vec2 uv;
attribute float side;

uniform vec2 uResolution;
uniform float uDPR;
uniform float uThickness;

vec4 getPosition() {
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1);
    vec2 nextScreen = next.xy * aspect;
    vec2 prevScreen = prev.xy * aspect;

    vec2 tangent = normalize(nextScreen - prevScreen);
    vec2 normal = vec2(-tangent.y, tangent.x);
    normal /= aspect;
    normal *= 1.0 - pow(abs(uv.y - 0.5) * 2.0, 2.0);

    float pixelWidth = 1.0 / (uResolution.y / uDPR);
    normal *= pixelWidth * uThickness;

    // When the points are on top of each other, shrink the line to avoid artifacts.
    float dist = length(nextScreen - prevScreen);
    normal *= smoothstep(0.0, 0.02, dist);

    vec4 current = vec4(position, 1);
    current.xy -= normal * side;
    return current;
}

void main() {
    gl_Position = getPosition();
}