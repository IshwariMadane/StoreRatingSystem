const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Rating = sequelize.define("Rating", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  user_id: DataTypes.INTEGER,
  store_id: DataTypes.INTEGER,
  rating: DataTypes.INTEGER
},
{
  tableName: "ratings",
  timestamps: false
});

module.exports = Rating;