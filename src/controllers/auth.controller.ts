import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../utils/prisma";
import { hashPassword } from "../utils/bcrypt-hash";

export class AuthController {
  constructor() { }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password)
      res
        .status(StatusCodes.OK)
        .json({ message: "Please enter username or password" });

    try {
      res.setHeader("authorization", "123");
      res.cookie("refresh_token", "1111", {
        maxAge: Number(process.env.JWT_EXPIRE_HR) * 60 * 1000,
        secure: false, // set true in prod
        httpOnly: true,
        sameSite: "lax", // set strict in prod
      });

      res.status(StatusCodes.OK).json({ message: "Successfully logged in" });
    } catch (error: any) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password } = req.body;

      const existingUser = await prisma.profile.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ message: "Email is already registered." });
      }

      const hashedPassword = await hashPassword(password);

      const newUser = await prisma.profile.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          createdAt: new Date(),
          roleId: 2, // << USER ROLE
        },
      });

      res.status(StatusCodes.OK).json({
        message: "User have been registered successfully",
        user: {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        },
      });
    } catch (error: any) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      res.status(StatusCodes.OK).json({ message: "123" });
    } catch (error: any) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
