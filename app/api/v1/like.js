const Router = require('koa-router')
const { Favor } = require('@models/favor')
const { success } = require('@util/helper')
const { Auth } = require('@middlewares/auth')
const { LikeValidator } = require('../../validators/validtor')

const router = new Router({
  prefix: '/v1/like'
})

router.post('/', new Auth().m, async ctx => {
  const v = await new LikeValidator().validate(ctx, {
    id: 'art_id'
  })
  await Favor.like(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
  success()
})

router.post('/cancel', new Auth().m, async ctx => {
  const v = await new LikeValidator().validate(ctx, {
    id: 'art_id'
  })
  await Favor.dislike(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
  success()
})

module.exports = router
