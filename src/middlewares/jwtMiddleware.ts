import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma";
import generateToken from "../utils/generateToken";
import { JWTPayload } from "../types/index.types";

const { JWT_SECRET_KEY } = process.env;

const jwtMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.headers["authorization"];
  const refreshToken = req.cookies["refresh_token"];

  if (!accessToken)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "No Token Provided" });

  try {
    const decoded = jwt.verify(accessToken, String(JWT_SECRET_KEY));

    // when the token is still within accessToken expiration
    (req as any).user = decoded;

    return next();
  } catch (error: any) {
    // when token has exceed accessToken expiration
    if (error.name !== "TokenExpiredToken")
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid Token" });

    if (!refreshToken)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Session Expired - Please log in again." });

    try {
      const decodedRefresh = jwt.verify(
        refreshToken,
        String(JWT_SECRET_KEY),
      ) as JWTPayload;

      const user = await prisma.profile.findUnique({
        where: { id: decodedRefresh.id },
      });

      if (!user)
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "User not found with Refresh Token" });

      const { accessToken: newAccess, refreshToken: newRefresh } =
        generateToken(user);

      res.setHeader("authorization", newAccess);
      res.cookie("refresh_token", newRefresh, {
        maxAge: Number(process.env.JWT_EXPIRE_HR) * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });

      (req as any).user = jwt.decode(newAccess);
      return next();
    } catch (refreshError: any) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Refresh Token Expired - Please log in again." });
    }
  }
};

export default jwtMiddleware;
