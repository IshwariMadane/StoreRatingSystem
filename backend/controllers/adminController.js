const User = require("../models/User");
const Store = require("../models/Store");
const Rating = require("../models/Rating");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

// Dashboard Statistics
const dashboard = async (req, res) => {
  try {

    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    res.json({
      totalUsers,
      totalStores,
      totalRatings
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

// Add User
const addUser = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      address,
      role
    } = req.body;

    const existingUser = await User.findOne({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role
    });

    res.status(201).json({
      message: "User Added Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

// Add Store
const addStore = async (req, res) => {
  try {

    const {
      name,
      email,
      address,
      owner_id
    } = req.body;

    await Store.create({
      name,
      email,
      address,
      owner_id
    });

    res.status(201).json({
      message: "Store Added Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

// View All Stores
const getStores = async (req, res) => {
  try {

    const stores = await Store.findAll();

    res.json(stores);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

// View All Users + Search
const getUsers = async (req, res) => {
  try {

    const { search } = req.query;

    let users;

    if (search) {

      users = await User.findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${search}%`
              }
            },
            {
              email: {
                [Op.like]: `%${search}%`
              }
            },
            {
              address: {
                [Op.like]: `%${search}%`
              }
            },
            {
              role: {
                [Op.like]: `%${search}%`
              }
            }
          ]
        },
        attributes: {
          exclude: ["password"]
        }
      });

    } else {

      users = await User.findAll({
        attributes: {
          exclude: ["password"]
        }
      });

    }

    res.json(users);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

// View Single User Details
const getUserDetails = async (req, res) => {
  try {

    const user = await User.findByPk(
      req.params.id,
      {
        attributes: {
          exclude: ["password"]
        }
      }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

module.exports = {
  dashboard,
  addUser,
  addStore,
  getStores,
  getUsers,
  getUserDetails
};