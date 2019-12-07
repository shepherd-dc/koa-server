const Koa = require('koa')
const Router = require('koa-router')
const requireDirectory = require('require-directory')

const app = new Koa()

requireDirectory(module, './src/api', { visit: whenLoadModule })

function whenLoadModule (obj) {
  if (obj instanceof Router) {
    app.use(obj.routes())
  }
}

app.listen(3000)
