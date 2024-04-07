const { isName, isPassword, isEmail } = require("../utils/validators");
const { hashPassword, comparePasswords } = require("../utils/auth");
const User = require("../models/user");
const jwToken = require("jsonwebtoken");

//endpoits
const loginUser = async (req, res) => {
  try {
    const { email, pass } = req.body;
    //user exist check
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "user does not exist",
      });
    }
    //pass check
    const match = await comparePasswords(pass, user.pass);
    if (match) {
      jwToken.sign(
        { email: user.email, id: user._id, login: user.login },
        process.env.JWT_SECRET,
        {},
        (error, token) => {
          if (error) throw error;
          res.cookie("token", token).json(user);
        }
      );
    } else {
      return res.json({ error: "wrong password" });
    }
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (req, res) => {
  try {
    const { login, email, pass } = req.body;
    //login check
    if (!login) {
      return res.json({ error: "login field is empty" });
    } else if (login && !isName(login)) {
      return res.json({ error: "login has wrong format" });
    }
    //email check
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "email is already used",
      });
    } else if (!email) {
      return res.json({
        error: "email field is empty",
      });
    } else if (email && !isEmail(email)) {
      return res.json({ error: "email has wrong format" });
    }
    //pass check
    if (!pass || pass.length < 0) {
      return res.json({
        error: "password should be at least 8 characters long",
      });
    } else if (pass && !isPassword(pass)) {
      return res.json({ error: "password has wrong format" });
    }

    const hashedPass = await hashPassword(pass);
    const user = await User.create({ login, email, pass: hashedPass });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwToken.verify(token, process.env.JWT_SECRET, {}, (error, user) => {
      if (error) throw error;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

module.exports = { loginUser, registerUser, getProfile };
