
#define PI 3.14159265359
attribute vec3 aPosition;
attribute vec3 aColor;
attribute vec3 aSize;
attribute vec3 aCurve;
attribute vec3 aFaces;
attribute vec4 aCenter;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vColor;
varying vec4 vCenter;
varying float vTime;
varying float vScale;

uniform float uTime; 
uniform float uScale;


void main() {
  vUv = uv;
  vColor = aColor;
  vNormal = normal;
  vTime = uTime;
  vScale = uScale;

  vCenter = aCenter;
  vec3 pos = position;

  pos *= uScale;  
  pos *= aCenter.w ; 
  pos += aCenter.xyz * 1.2;   
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1. );

  gl_Position = projectionMatrix * mvPosition;
}
