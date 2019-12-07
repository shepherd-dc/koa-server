const Koa = require('koa')
const InitManager = require('./src/util/init')

const app = new Koa()

InitManager.initCore(app)

app.listen(3000)
