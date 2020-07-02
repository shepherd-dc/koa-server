const { sequelize } = require('../models/db')
const { Sequelize, Model } = require('sequelize')

class HotBook extends Model {
  static async getAll () {
    const books = await HotBook.findAll({
      order: [
        'index'
      ]
    })
    return books
  }
}

HotBook.init({
  index: Sequelize.INTEGER,
  image: Sequelize.STRING,
  author: Sequelize.STRING,
  title: Sequelize.STRING
}, {
  sequelize,
  tableName: 'hot_book'
})

module.exports = {
  HotBook
}
