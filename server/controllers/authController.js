import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import admin from "firebase-admin";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User is not registered, Please register and try again",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Password do not match",
      });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      "hello_this_string",
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60,
    });

    res.status(200).json({
      preferences: user.preferences,
      message: "Login Successful",
    });
  } catch (error) {}
};

export const verify = async (req, res) => {
  if (!req.user) {
  } else {
    return res.status(200).json({
      authenticated: true,
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(404).json({
        message: "User is already registered, Please Login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { name, email, password: hashedPassword };

    const newUser = await User.create(userData);
    res.status(201).json({
      message: "User Registered",
      data: newUser,
    });
  } catch (error) {}
};

export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: 'ID token is required' });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    let user = await User.findOne({email: decodedToken.email})

    if(!user){
      user = new User({
        name: decodedToken.name || "No Name",
        email: decodedToken.email,
        password: "google-auth"
    
      });
      await user.save();
    }
    
      const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET || "hello_this_string",
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      authenticated: true,
      id: user._id,
      email: user.email,
      name: user.name,
      preferences: user.preferences || {},
      message: 'Login successful.',
    });
  } catch (error) {
    console.error('Google Login Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
