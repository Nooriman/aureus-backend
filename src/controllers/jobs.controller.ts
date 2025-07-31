import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../utils/prisma";
import { getUserFromToken } from "../utils/getUserFromToken";

export class JobsController {
  constructor() {}

  async getAllJobs(req: Request, res: Response) {
    try {
      const jobs = await prisma.job.findMany();

      res.status(StatusCodes.OK).json(jobs);
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

  async createJobs(req: Request, res: Response) {
    try {
      const { title, description, company, salary } = req.body;

      const token = req.headers.authorization;
      const user = getUserFromToken(token);

      // check for admin role
      if (user?.role !== 1) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ message: "Only admin can create jobs" });
      }

      // check for required fields
      if (!title || !description || !company || !salary) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Missing required fields" });
      }

      let imageUrl = "";
      if (req.file) {
        imageUrl = `/uploads/${req.file.filename}`;
      }

      const job = await prisma.job.create({
        data: {
          title,
          description,
          company,
          salary,
          imageUrl,
          createdBy: user.id,
        },
      });

      res
        .status(StatusCodes.OK)
        .json({ message: "Job successfully created", job });
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
