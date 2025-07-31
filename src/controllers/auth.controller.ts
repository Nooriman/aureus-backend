import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../utils/prisma";
import { comparePassword, hashPassword } from "../utils/bcrypt-hash";
import generateToken from "../utils/generateToken";

export class AuthController {
  constructor() {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please enter email or password" });

    try {
      const user = await prisma.profile.findFirst({
        where: { email },
      });

      if (!user) throw new Error("User is not found");

      const passwordMatched = await comparePassword(password, user.password);

      if (!passwordMatched)
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Wrong Password. Please try again" });

      const { accessToken, refreshToken } = generateToken(user);

      res.setHeader("authorization", accessToken);
      res.cookie("refresh_token", refreshToken, {
        maxAge: Number(process.env.JWT_EXPIRE_HR) * 60 * 60 * 1000,
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
      res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: false, // only will be true if in prod
        sameSite: "lax",
      });

      res.status(StatusCodes.OK).json({ message: "Successfully logged out" });
    } catch (error: any) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error loggin out user" });
    }
  }
}
