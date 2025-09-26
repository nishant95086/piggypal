require("dotenv").config();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedpassword,
    });
    await newUser.save();
    if (newUser) {
      return res.status(201).json({
        success: true,
        message: "user is created",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "try again.",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "register fail",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "enter correct email",
      });
    }

    const ispasswordMatch = await bcrypt.compare(password, user.password);
    if (!ispasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "enter correct password",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        userName: user.name,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d"
      }
    );

    res.status(201).json({
      success: true,
      message: "user is login",
      accessToken: accessToken,   // ✅ consistent key
      user: {               // ✅ include full user info
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { oldpassword, newpassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: true,
        message: "user not found",
      });
    }

    const checkoldpassword = await bcrypt.compare(oldpassword, user.password);
    if (!checkoldpassword) {
      return res.status(400).json({
        success: true,
        message: "old password is not right",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(newpassword, salt);

    user.password = hashedpassword;
    await user.save();
    res.status(201).json({
      success: true,
      message: "password change sucessfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

module.exports = {register,login,changePassword};