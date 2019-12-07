const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager {
  static initCore (app) {
    InitManager.app = app
    InitManager.initLoadRouters()
  }

  // 自动获取并注册路由
  static initLoadRouters () {
    const apiDirectory = `${process.cwd()}/src/api`
    requireDirectory(module, apiDirectory, { visit: whenLoadModule })
  }
}

function whenLoadModule (obj) {
  if (obj instanceof Router) {
    InitManager.app.use(obj.routes())
  }
}

module.exports = InitManager
