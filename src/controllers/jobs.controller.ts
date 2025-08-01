import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../utils/prisma";
import { getUserFromToken } from "../utils/getUserFromToken";

export class JobsController {
  constructor() {}

  async getAllJobs(req: Request, res: Response) {
    try {
      const jobs = await prisma.job.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
        },
      });

      res.status(StatusCodes.OK).json(jobs);
    } catch (error: any) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  async getJobDetails(req: Request, res: Response) {
    try {
      const jobsId = req.query.id;

      if (!jobsId) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Job ID is required" });
      }

      const job = await prisma.job.findFirst({
        where: { id: String(jobsId), isActive: true },
        select: {
          id: true,
          title: true,
          description: true,
          company: true,
          salary: true,
          imageUrl: true,
          postedAt: true,
        },
      });

      if (!job) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Jobs is not found" });
      }

      res.status(StatusCodes.OK).json(job);
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

      // create imageUrl
      let imageUrl = "";
      if (req.file) {
        imageUrl = `/uploads/${req.file.filename}`;
      }

      // create jobs
      const job = await prisma.job.create({
        data: {
          title,
          description,
          company,
          salary: Number(salary),
          imageUrl: imageUrl,
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
      const jobId = req.body.id;

      const token = req.headers.authorization;
      const user = getUserFromToken(token);

      const existingApplication = await prisma.userJobApplication.findFirst({
        where: { jobId: jobId, userId: Number(user?.id) },
      });

      // handle if user already applied
      if (existingApplication) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ message: "You have already applied for this job" });
      }

      if (!jobId) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Job ID is required" });
      }

      const job = await prisma.job.findFirst({
        where: { id: jobId, isActive: true },
      });

      // handle deleted job cases
      if (!job) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Job have been deleted" });
      }

      const appliedJob = await prisma.userJobApplication.create({
        data: {
          jobId: jobId,
          userId: Number(user?.id),
        },
      });

      res.status(StatusCodes.OK).json({
        message: "You have successfully applied for the job.",
        data: appliedJob,
      });
    } catch (error: any) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  async getAppliedJobs(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;
      const user = getUserFromToken(token);

      const jobs = await prisma.userJobApplication.findMany({
        where: { userId: Number(user?.id) },
        orderBy: { appliedAt: "desc" },
        include: {
          job: {
            select: {
              title: true,
              description: true,
              company: true,
              salary: true,
              imageUrl: true,
            },
          },
        },
      });

      res.status(StatusCodes.OK).json(jobs);
    } catch (error: any) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  async deleteJob(req: Request, res: Response) {
    try {
      const jobId = req.params.id;

      if (!jobId) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Job ID is required" });
      }

      const updatedJob = await prisma.job.update({
        where: { id: jobId },
        data: { isActive: false },
      });

      res
        .status(StatusCodes.OK)
        .json({ message: "Job successfully deleted", data: updatedJob });
    } catch (error: any) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Jobs not found with job id" });
    }
  }
}
