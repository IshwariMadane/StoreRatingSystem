const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Store = sequelize.define("Store", {
  id: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true
},
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  address: DataTypes.STRING,
  owner_id: DataTypes.INTEGER
},
{
  tableName: "stores",
  timestamps: false
});

module.exports = Store;