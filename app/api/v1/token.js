const Router = require('koa-router')
const { TokenValidator, NotEmptyValidator } = require('../../validators/validtor')
const { LoginType } = require('../../util/enum')
const { generateToken } = require('../../util/token')
const { WXManager } = require('../../services/wx')
const { Auth } = require('../../../middlewares/auth')
const { User } = require('../../models/user')

const router = new Router({
  prefix: '/v1/token'
})

router.post('/', async (ctx) => {
  const v = await new TokenValidator().validate(ctx)
  let token
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
      token = await emailLogin(v.get('body.account'), v.get('body.secret'))
      break
    case LoginType.USER_MINI_PROGRAM:
      token = await WXManager.codeToToken(v.get('body.account'))
      break
    case LoginType.ADMIN_EMAIL:
      break
    default:
      throw new global.errs.ParameterException('没有相应的处理函数')
  }
  ctx.body = {
    code: 0,
    msg: 'ok',
    data: {
      token
    }
  }
})

router.post('/verify', async (ctx) => {
  // token
  const v = await new NotEmptyValidator().validate(ctx)
  const result = Auth.verifyToken(v.get('body.token'))
  ctx.body = {
    is_valid: result
  }
})

async function emailLogin (account, secret) {
  const user = await User.verifyEmailPassword(account, secret)
  return generateToken(user.id, Auth.USER)
}

module.exports = router
