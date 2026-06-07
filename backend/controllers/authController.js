const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup
const signup = async (req, res) => {
  try {

    const { name, email, password, address, role } = req.body;

    const existingUser = await User.findOne({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role
    });

    res.status(201).json({
      message: "User Registered Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

// Login
const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    console.log("================================");
    console.log("Email:", email);
    console.log("Entered Password:", password);
    console.log("DB Password Hash:", user.password);

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    console.log("Password Match:", isMatch);
    console.log("================================");

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      "secretkey",
      {
        expiresIn: "1d"
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      role: user.role
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

// Update Password
const updatePassword = async (req, res) => {
  try {

    const { oldPassword, newPassword } = req.body;

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Old Password Incorrect"
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password Updated Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

module.exports = {
  signup,
  login,
  updatePassword
};