const Sequelize = require("sequelize")

const connection = new Sequelize('guiapress', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection