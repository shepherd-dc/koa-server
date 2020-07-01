const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager {
  static initCore (app) {
    InitManager.app = app
    InitManager.initLoadRouters()
    InitManager.loadConfig()
    InitManager.loadHttpException()
  }

  // 自动获取并注册路由
  static initLoadRouters () {
    const apiDirectory = `${process.cwd()}/app/api`
    requireDirectory(module, apiDirectory, { visit: whenLoadModule })
  }

  // 获取配置文件中的配置
  static loadConfig (path = '') {
    const configPath = path || process.cwd() + '/config/index.js'
    const config = require(configPath)
    global.config = config
  }

  // 将自定义 HttpException异常类 挂载到 global全局
  static loadHttpException () {
    const errors = require('./lib/http-exception')
    global.errs = errors
  }
}

function whenLoadModule (obj) {
  if (obj instanceof Router) {
    InitManager.app.use(obj.routes())
  }
}

module.exports = InitManager
