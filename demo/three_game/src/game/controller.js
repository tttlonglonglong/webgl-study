/**
 * controller是业务层唯一能介入的MVC中的模块的作用有俩点：
 * 1.view改变的时候，通过controller去驱动model里面数据的改变
 * 2.model 的数据改变的时候通过controller去驱动view 的改变
 * 注：业务层无法直接驱动view和model的变换
 *    view和model变换相关逻辑的接口都是从controller中爆漏出去
 *    view和model的改动变得更加可控
 */
// 引入View 和 Model层的控制器
import gameView from './view'
import gameModel from './model'

class GameController {
  constructor() {
    this.gameView = gameView
    this.gameModel = gameModel
  }
  // controller暴露给业务方相关控制逻辑，控制逻辑的底层交给view或者model处理
  showGameOverPage = () => {
    // view层控制UI渲染的逻辑，控制逻辑是controller去做的
    this.gameView.showGameOverPage()
  }
  restartGame = () => {
    this.gameView.restartGame()
  }
  initPages() {
    const gemePageCallbacks = {
      // 游戏页面的回调展示游戏结束的画面
      showGameOverPage: this.showGameOverPage
    }
    const gemeOverPageCallbacks = {
      // over页面的回调重新开始游戏
      gameRestart: this.restartGame
    }
    console.log('this.gameView', this.gameView)
    this.gameView.initGameOverPage(gemeOverPageCallbacks)
    this.gameView.initGamepage(gemePageCallbacks)
  }
}

export default new GameController()
