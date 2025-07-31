import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getUserFromToken } from "../utils/getUserFromToken";
import prisma from "../utils/prisma";

export class ProfileController {
  constructor() {}

  async getProfileDetails(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;
      const data = getUserFromToken(token);

      const userProfile = await prisma.profile.findUnique({
        where: { id: data?.id },
        include: { role: true },
      });

      if (!userProfile) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Profile not found" });
      }

      res.status(StatusCodes.OK).json(userProfile);
    } catch (error: any) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
