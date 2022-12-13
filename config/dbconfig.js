const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("test-db", "username", "password", {
  dialect: "sqlite",
  host: "./config/db.sqlite",
});

module.exports = sequelize;
