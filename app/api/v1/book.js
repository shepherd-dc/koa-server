const Router = require('koa-router')

const { HotBook } = require('../../models/hot-book')
const { Auth } = require('../../../middlewares/auth')

const router = new Router({
  prefix: '/v1/book'
})

router.get('/hot_list', new Auth().m, async (ctx, next) => {
  const books = await HotBook.getAll()
  ctx.body = books
})

module.exports = router
