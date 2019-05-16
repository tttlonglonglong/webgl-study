export default class GamePage {
  constructor(callbacks) {
    // 初始化页面接收的箭头函数
    this.callbacks = callbacks
  }
  init() {
    console.log('GamePage init')
  }
  restart() {
    console.log('GamePage restart')
  }
}
