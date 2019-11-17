export default class GameOverPage {
  constructor(callbacks) {
    this.callbacks = callbacks
  }
  init() {
    this.initGameoverCanvas()
    // console.log('gameOverPage init')
  }
  initGameoverCanvas() {
    // 计算屏幕宽高比
    const aspect = window.innerHeight / window.innerWidth
    this.canvas = document.createElement('canvas')
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    // 纹理
    this.texture = ''
  }
  show() {
    console.log('gameOverPage show')
  }
}
