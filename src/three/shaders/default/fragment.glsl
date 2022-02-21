#define GLSLIFY 1
uniform vec3 _Color;

void main()
{
  gl_FragColor = vec4(_Color, 1.0);
}