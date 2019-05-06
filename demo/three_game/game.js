/**
 *  小游戏入口
 */
import * as THREE from './libs/three.js'
import './libs/weapp-adapter'
// threeJs中三个概念：渲染器、sense场景、相机,这三者能让一个完整的图形绘制在canvas的画布上
// 1.一个场景要渲染出来，需要三个东西webglrenderer就是wengl的渲染器，类似在原生webgl中针对某个canvas去获取相关3Dcontext上下文的过程
// 渲染器要做的事情就是传递一个camera和sense，从而在渲染器的canvas上渲染出对应cameral视角下sense中的物体和展示出来的情况

var width = 375
var height = 667
// var canvas = document.getElementById('demo-canvas')
var renderer = new THREE.WebGLRenderer({ canvas: canvas })

// 场景中有很多物体，主要是去维护在场景中的物体
// Scene.add: sence 去 add mesh根据mesh的坐标，设置场景的坐标
var scene = new THREE.Scene()
// 正交相机没有透视效果
// 定义相机：上下左右前后的情况，从而去规定正交相机所能截取到的相关的平面空间中所有的物体的情况，
// 只有在这个立方体所包围出来的区域内的物体才会被正交相机所截取，最终渲染到屏幕上
var camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 1000, -1000)

// renderer.setClearColor(new THREE.Color(0x000000, 1.0))
// 微信不支持透明度
renderer.setClearColor(new THREE.Color(0x000000))
renderer.setSize(375, 667)

// 绘制一个geo三角形
var triangleShape = new THREE.Shape()
triangleShape.moveTo(0, 100)
triangleShape.lineTo(-100, -100)
triangleShape.lineTo(100, -100)
triangleShape.lineTo(0, 100)

//用shape去创建matry几何体
var geometry = new THREE.ShapeGeometry(triangleShape)
// 几何体的绘制素材，材质
var material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide //正反面都渲染的材质，默认只渲染一面
})

// Mesh = 几何体 + 材质
// geometry： 类似顶点着色器
// material：类似于片段着色器
var mesh = new THREE.Mesh(geometry, material)
mesh.position.x = 0
mesh.position.y = 0
mesh.position.z = 1
// 将物体添加到场景
scene.add(mesh)

camera.position.x = 0
camera.position.y = 0
camera.position.z = 0
camera.lookAt(new THREE.Vector3(0, 0, 1))

var currentAngle = 0
var lastTimestamp = Date.now()

var animate = function() {
  var now = Date.now()
  var duration = now - lastTimestamp
  lastTimestamp = now
  // threeJs使用的是弧度
  currentAngle = currentAngle + (duration / 1000) * Math.PI
}

var render = function() {
  animate()
  // 绕y轴旋转
  mesh.rotation.set(0, currentAngle, 0)
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()
