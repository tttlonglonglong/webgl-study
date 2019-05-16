/**
 * 视图控制层
 */

// 引入view控制的页面
import GamePage from '../pages/game-page'
import GameOverPage from '../pages/game-over-page'
class GameView {
  constructor() {}

  showGameOverPage() {
    this.gameOverPage.show()
  }
  restartGame() {
    this.gamePage.restart()
  }
  initGameOverPage() {
    this.gameOverPage = new GameOverPage(callbacks)
    this.gameOverPage.init()
  }
  // 初始化游戏页面，页面改变要驱动model变化，需要传一个callback，页面初始化完去执行callback
  initGamepage(callbacks) {
    this.gamePage = new GamePage(callbacks)
    this.gamePage.init()
  }
}

export default new GameView()
