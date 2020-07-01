const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const InitManager = require('./init')
const catchError = require('./middlewares/exception')

const app = new Koa()

app.use(bodyParser())

// 全局捕获未知异常
app.use(catchError)

InitManager.initCore(app)

app.listen(3000)

console.log('Koa server is listening at http://localhost:3000')
