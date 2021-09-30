const router = require("express").Router();
const { confirmation } = require("../controllers/userController");

router.post("/confirm/:confirmationCode", confirmation);

module.exports = router;
