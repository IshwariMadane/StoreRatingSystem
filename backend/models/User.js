const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  address: DataTypes.STRING,
  role: DataTypes.STRING
},
{
  tableName: "users",
  timestamps: false
});

module.exports = User;