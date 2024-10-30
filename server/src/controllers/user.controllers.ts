import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models";
import type { Request, Response } from "express";
import { signUpSchema, signInSchema } from "../lib/validators/user.validators";

export const signUp = async (req: Request, res: Response) => {
  const { success, error, data } = signUpSchema.safeParse(req.body);

  if (!success) {
    return res
      .status(400)
      .json({ message: error.errors[0].message, success: false });
  }

  const { email, password } = data;

  try {
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User with this email already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (err) {
    console.error("Error while creating a new user: ", err);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { success, error, data } = signInSchema.safeParse(req.body);

  if (!success) {
    return res
      .status(400)
      .json({ message: error.errors[0].message, success: false });
  }

  const { email, password } = data;

  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET as string
    );

    return res
      .status(200)
      .json({ token, message: "Signed in successfully", success: true });
  } catch (err) {
    console.error("Error while signing in user: ", err);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
