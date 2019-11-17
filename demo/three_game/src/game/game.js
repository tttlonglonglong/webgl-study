/**
 * 业务代码逻辑
 *  通过controller去改变view 和 model
 */

import gameController from './controller'

class Game {
  constructor() {
    this.gameController = gameController
  }
  init() {
    this.gameController.initPages()
  }
}

// es6类的方法和属性 需要实例化才能使用
// es6没有private这个私有说法，无法做到封装
export default new Game()
