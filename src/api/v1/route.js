const Router = require('koa-router')
const router = new Router()

router.get('/test', (ctx, next) => {
  ctx.body = { data: 'test' }
})

module.exports = router
