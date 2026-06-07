const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "store_rating", // your database name
  "root",         // mysql username
  "root",// mysql password
  {
    host: "localhost",
    dialect: "mysql"
  }
);

module.exports = sequelize;