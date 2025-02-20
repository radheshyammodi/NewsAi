import User from "../model/User.js";
import bcrypt from "bcrypt"

export const login = async (req, res) => {
  try {
    const {email,password} = req.body
    const user = await User.findOne({email})

    if(!user){
      return res.status(4047).json({
        message:"User is not registered, Please register and try again"
      })
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
      return res.status(401).json({
        message:"Password do not match"
      })
    }

  } catch (error) {
    
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
