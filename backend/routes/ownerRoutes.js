const router = require("express").Router();

const auth = require("../middleware/auth");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  dashboard
} = require("../controllers/ownerController");

router.get(
  "/dashboard",
  auth,
  roleMiddleware("OWNER"),
  dashboard
);

module.exports = router;