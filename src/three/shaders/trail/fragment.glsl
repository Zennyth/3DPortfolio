#define GLSLIFY 1
uniform vec3 uColor;

void main()
{
  gl_FragColor = vec4(uColor, 1.0);
}