const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password, passwordCheck } = req.body.user;
    } catch (err) {
      console.log("register err", err);
    }
  },
};
