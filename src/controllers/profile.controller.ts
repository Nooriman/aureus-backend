import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class ProfileController {
  constructor() { }

  async getProfileDetails(req: Request, res: Response) {
    try {
      res.status(StatusCodes.OK).json({ message: "123" });
    } catch (error: any) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
