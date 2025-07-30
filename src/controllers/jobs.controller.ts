import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class JobsController {
  constructor() { }

  async getAllJobs(req: Request, res: Response) {
    try {
      res.status(StatusCodes.OK).json({ message: "123" });
    } catch (error: any) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  async getJobDetails(req: Request, res: Response) {
    try {
      res.status(StatusCodes.OK).json({ message: "123" });
    } catch (error: any) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  async applyJob(req: Request, res: Response) {
    try {
      res.status(StatusCodes.OK).json({ message: "123" });
    } catch (error: any) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  async getAppliedJobs(req: Request, res: Response) {
    try {
      res.status(StatusCodes.OK).json({ message: "123" });
    } catch (error: any) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  async deleteJob(req: Request, res: Response) {
    try {
      res.status(StatusCodes.OK).json({ message: "123" });
    } catch (error: any) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
