import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, cnp, phoneNumber } = req.body;
  const user = await User.findOne({ cnp: cnp });
  try {
    if (user) {
       res.status(404).json("User already exists.");
    }

    if(!user?.email.includes("@eduardpharma.com")) {
      res.status(400).json(`Invalid email.`);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      cnp,
      phoneNumber,
    });

    const savedUser = await newUser.save();
     res.status(201).json(savedUser);
  } catch (error) {
     res
      .status(500)
      .json(`An error occured while saving new user... ${error}`);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { cnp, password } = req.body;
  const user = await User.findOne({ cnp: cnp });
  try {
    if (!user) {
       res.status(404).json("User not found.");
    }

    const isMatch = await bcrypt.compare(password, user!.password!);

    if (!isMatch) {
       res.status(400).json("Invalid credentials!");
    }

    const token = jwt.sign({ id: user!._id }, process.env.JWT_SECRET!);
    delete user!.password;

     res.status(200).json({ token, user });
  } catch (error) {
     res
      .status(500)
      .json(`An error occured while logging in..., ${error}`);
  }
};
