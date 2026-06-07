const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  dashboard,
  addStore,
  getStores,
  getUsers,
  addUser,
  getUserDetails
} = require("../controllers/adminController");

// Dashboard
router.get(
  "/dashboard",
  auth,
  roleMiddleware("ADMIN"),
  dashboard
);

// Add User
router.post(
  "/add-user",
  auth,
  roleMiddleware("ADMIN"),
  addUser
);

// Add Store
router.post(
  "/add-store",
  auth,
  roleMiddleware("ADMIN"),
  addStore
);

// View All Stores
router.get(
  "/stores",
  auth,
  roleMiddleware("ADMIN"),
  getStores
);

// View All Users
router.get(
  "/users",
  auth,
  roleMiddleware("ADMIN"),
  getUsers
);

// View Single User Details
router.get(
  "/user/:id",
  auth,
  roleMiddleware("ADMIN"),
  getUserDetails
);

module.exports = router;