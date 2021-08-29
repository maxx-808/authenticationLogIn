const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) {
      return res.status(401).json({ msg: "No token passed." });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      return res.status(401).json({ msg: "Token verification failed." });
    }

    req.user = verified.id;
    next();
  } catch (err) {
    console.log("auth err: ", err);
  }
};

module.exports = auth;
