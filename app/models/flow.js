const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('./db')
const { Art } = require('./art')
const { Favor } = require('./favor')

class Flow extends Model {
  static async getData (index, art_id, type, uid) {
    const art = await Art.getData(art_id, type, uid)
    const like = await Favor.userLikeIt(art_id, type, uid)
    art.setDataValue('index', index)
    art.setDataValue('like_status', like)
    return art
  }
}

Flow.init({
  index: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER
}, {
  sequelize,
  tableName: 'flow'
})

module.exports = {
  Flow
}
