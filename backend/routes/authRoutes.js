const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  signup,
  login,
  updatePassword
} = require("../controllers/authController");

router.post("/signup", signup);

router.post("/login", login);

router.put(
  "/update-password",
  auth,
  updatePassword
);

router.get("/", (req, res) => {
  res.send("Auth Route Working");
});

module.exports = router;