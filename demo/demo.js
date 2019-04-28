//  调用webgl的一个API，完成渲染管线的逻辑
// 拿到canvas的上下文对象，进行渲染管线的编程
var canvas = document.getElementById('myCanvas')
// 2d webgl webgl2
var gl = canvas.getContext('webgl')
// console.log('webgl', gl)

var vertexShader, fragmentShader
var VSHADER_SOURCE, FSHADER_SOURCE
VSHADER_SOURCE = `
attribute vec4 a_Position; 
void main () {
  gl_Position = a_Position;
}`
FSHADER_SOURCE = `
  void main(){
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`
// 创建shader
function createSahder(gl, sourceCode, type) {
  var shader = gl.createShader(type)
  // 给shader 挂载代码
  gl.shaderSource(shader, sourceCode)
  gl.compileShader(shader)
  return shader
}
// 定义 顶点着色器 和 片元着色器
vertexShader = createSahder(gl, VSHADER_SOURCE, gl.VERTEX_SHADER)
fragmentShader = createSahder(gl, FSHADER_SOURCE, gl.FRAGMENT_SHADER)

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

// 将顶点的位置传递到vertex shader中
// 实现 a_Position 和 对应的buffer 绑定
function initVertextBuffers(gl) {
  var vertices = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5])
  var n = 3
  var vertexBuffer = gl.createBuffer()
  // 顶点缓冲区有俩种：ARRAY_BUFFER:顶点缓冲区， ELEMENT_ARRAY_BUFFER: 顶点索引缓冲区
  // 顶点索引缓冲区中有些数据是重复的，比如一个点在多个三角形或者图形中都构成了图形的顶点化，它就会多次重复出现，
  // 因为整个webgl相关的图元都是根据三角形进行render的，所以它会读取三角形相关的图元，所以作为三角形的顶点，它有可能在多个三角形中同时存在，它有可能是重复的，这种情况可以使用索引来减少buffer的使用空间
  // 对于相同的索引坐标，置为相同的索引即可，对于一个索引的存储空间，肯定比作为一个顶点的小，因为顶点会有多维，可能是一个三维的顶点，一个三维的向量
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  // 将数据灌入 Bufer
  // gl.BufferData()：灌入的方式， 要灌入的变量，webgl如何处理缓冲区，如何对缓冲区进行优化，
  // 缓冲区如何使用STATIC_DRAW：第一次对缓冲区进行render之后，再也不会对缓冲区的数据进行修改；
  // 如果需要对缓冲区进行频繁修改的话，需要传其他变量，webgl会针对缓冲区刷新的频率对缓冲区整体的性能效果进行优化
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
  //获取顶点坐标的位置
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  // 将bufferDate 放到 a_Position的地址之下
  // a_Position中如何使用bufferData中的数据，是俩个数作为一个坐标，还是三个作为一个坐标
  // gl.vertexAttribPointer(index, size, type, normalized, stride, offset)
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
  // 启用a_Positionsa_Positions这个变量
  gl.enableVertexAttribArray(a_Position)
  // 返回设置了几个顶点坐标
  return n
}

// 将顶点的位置传递到vertex shader中(js代码通过显存往shader中传递数据)
var n = initVertextBuffers(gl)

// 清空颜色缓冲时的颜色值
gl.clearColor(0, 0, 0, 1)
function draw() {
  // 清除画布，添加背景色
  gl.clear(gl.COLOR_BUFFER_BIT)
  // gl.drawArrays(mode, first, count)
  gl.drawArrays(gl.TRIANGLES, 0, n)
}
draw()
