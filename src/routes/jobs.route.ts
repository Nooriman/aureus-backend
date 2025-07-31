import { Request, Response, Router } from "express";
import { JobsController } from "../controllers/jobs.controller";
import { upload } from "../utils/multer";

const router = Router();
const jobsController = new JobsController();

router.get("/all-jobs", (req: Request, res: Response) => {
  jobsController.getAllJobs(req, res);
});

router.get("/job-details", (req: Request, res: Response) => {
  jobsController.getJobDetails(req, res);
});

router.post(
  "/create-job",
  upload.single("image"),
  (req: Request, res: Response) => {
    jobsController.createJobs(req, res);
  },
);

router.post("/apply-job", (req: Request, res: Response) => {
  jobsController.applyJob(req, res);
});

router.get("/applied-jobs", (req: Request, res: Response) => {
  jobsController.getAppliedJobs(req, res);
});

router.put("/delete-job", (req: Request, res: Response) => {
  jobsController.deleteJob(req, res);
});

export default router;
