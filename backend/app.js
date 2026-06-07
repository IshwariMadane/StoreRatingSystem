const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");   // ADD THIS
const ownerRoutes = require("./routes/ownerRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);  
app.use("/api/owner", ownerRoutes);  // ADD THIS

sequelize.authenticate()
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});