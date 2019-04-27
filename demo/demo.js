//  调用webgl的一个API，完成渲染管线的逻辑
// 拿到canvas的上下文对象，进行渲染管线的编程
var canvas = document.getElementById('myCanvas')
// 2d webgl webgl2
var gl = canvas.getContext('webgl')
// console.log('webgl', gl)

var vertexShader, fragmentShader
var VSHADER_SOURCE, FSHADER_SOURCE

function createSahder(gl, sourceCode, type) {
  // 创建shader
  var shader = gl.createSahder(type)
  // 给shader 挂载代码
  gl.sourceCode(shader sourceCode)
  gl.compileShader(shader)
  return shader
}
// 顶点着色器
vertexShader = createSahder(gl,VSHADER_SOURCE,gl.VERTEXT_SHADER) 
//片元着色器
fragmentShader = createSahder(gl,FSHADER_SOURCE, gl.FRAGMENT_SHADER)

// 通过program 绑定 关联定义俩个着色器

var program = gl.createProgram()
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)

// 链接program 并使用
gl.linkProgram(program)
gl.useProgram(program)
gl.program = program

// 可以在代码层面定义多个program 和 多个shader，然后由代码决定当前使用哪个programg;
// program的定义使得对shader的使用更加的自由
