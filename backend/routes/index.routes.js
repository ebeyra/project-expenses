const router = require("express").Router();
const authRoutes = require("./auth.routes");
const usersRoutes = require("./users.routes");
const expensesRoutes = require("./expenses.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("Homepage");
});

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/expenses", expensesRoutes);

module.exports = router;
