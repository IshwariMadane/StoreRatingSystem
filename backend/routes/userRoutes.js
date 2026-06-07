const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  getStores,
  submitRating,
  updateRating
} = require("../controllers/userController");

router.get(
  "/stores",
  auth,
  getStores
);

router.post(
  "/rating",
  auth,
  submitRating
);

router.put(
  "/rating",
  auth,
  updateRating
);

module.exports = router;