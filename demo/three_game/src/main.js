/**
 *游戏主函数
 * */

import * as THREE from '../libs/three.js'
window.THREE = THREE
import game from './game/game.js'

class Main {
  constructor() {}
  static init() {
    // 整个游戏逻辑控制的入口
    game.init()
  }
}

export default Main
