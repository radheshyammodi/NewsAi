import User from "../model/User.js";
import bcrypt from "bcrypt"

export const login = (req, res) => {};

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
