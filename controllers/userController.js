const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password, passwordCheck } = req.body.user;
      const location = req.body.location;
      console.log(location);

      //if one of the inputs are not inputted, throw error
      if (!name || !email || !password || !passwordCheck) {
        return res.status(400).json({ msg: "Must enter all fields" });
      }

      //if password length is less than 8 characters, throw error
      if (password.length < 8) {
        return res
          .status(400)
          .json({ msg: "Password needs to be longer than 8 characters" });
      }

      //if password does not match up with password check, throw error
      if (password !== passwordCheck) {
        return res
          .status(400)
          .json({ msg: "Password does not match the password check." });
      }

      //checking if there is an existing user based on the email used, and if so, saving it
      const existingUser = await User.findOne({ email: email });

      //if there is an existing user, throw error
      if (existingUser) {
        return res.status(400).json({ msg: "User already exists" });
      }

      //if everything has passed with no errors, start the encryption on the password to safeguard users info
      //creating salt (random string) to encrypt user password to safeguard users information
      const salt = await bcrypt.genSalt();
      //hashing (mixing) the salt and password so that it is random string
      const passwordHash = await bcrypt.hash(password, salt);

      // saving a variable string with all numbers letters and capital letters
      const characters =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

      //creating a token variable and randomizing the token based on the alloted characters
      let token = "";
      for (let i = 0; i < 25; i++) {
        token += characters[Math.floor(Math.random() * characters.length)];
      }

      //saving info inputted as a new user
      const newUser = new User({
        name,
        email,
        //saving password has the encrypted password
        password: passwordHash,
        confirmation: token,
      });

      //completing the save to the Database
      const savedUser = await newUser.save();

      //bring back the data of new user to page
      res.json(savedUser);
    } catch (err) {
      console.log("register err", err);
      res.status(500).json({ msg: err });
    }
  },
  login: async (req, res) => {
    try {
      //saving the input of email and password from user
      const { email, password } = req.body;

      //if no email input, send err
      if (!email) {
        res.status(400).json({ msg: "Please enter an email" });
      }

      //if no password input, send err
      if (!password) {
        res.status(400).json({ msg: "Please enter a password" });
      }

      //searching for user based on email inputted
      const user = await User.findOne({ email: email });

      //if no user found, send err
      if (!user) {
        res.status(401).json({
          msg: "The email or password you have entered is incorrect",
        });
      }

      // if there is a match, check password with the encryption password
      const isMatch = await bcrypt.compare(password, user.password);

      //if not a match, send err
      if (!isMatch) {
        res
          .status(401)
          .json({ msg: "The email or password you have entered is incorrect" });
      }

      //if user had not confirmed account, send err
      if (user.status != "active") {
        return res
          .status(401)
          .json({ msg: "You must confirm your email before logging in" });
      }

      //creates a token to allow the account to stay logged in for 24 hours
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      res.json({
        token,
        user: {
          id: user._id,
          email: user.email,
          name: [user.fName, user.lName],
        },
      });
    } catch (err) {
      res.status(500).json({ msg: err });
    }
  },
};
