import express, { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
const router = express.Router();
import { check, validationResult } from "express-validator";

router.post(
  "/register",
  [
    check("firstName", "First name is required").isString().notEmpty(),
    check("lastName", "Last name is required").isString().notEmpty(),
    check("email", "Email is required").isEmail().notEmpty(),
    check("password", "Password is required").isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      } else {
        user = new User(req.body);
        await user.save();
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY!, {
          expiresIn: "1d",
        });
        return res
          .cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
          })
          .json({ message: "User created successfully" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
