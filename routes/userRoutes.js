const router = require("express").Router();
const auth = require("../middleware/auth");
const { register } = require("../controllers/userController");

router.post("/register", register);

module.exports = router;
