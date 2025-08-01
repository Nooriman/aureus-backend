import { Request, Response, Router } from "express";
import { JobsController } from "../controllers/jobs.controller";
import { upload } from "../utils/multer";

const router = Router();
const jobsController = new JobsController();

/**
 * @swagger
 * /api/jobs/all-jobs:
 *   get:
 *     summary: Get all active jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: List of all active jobs
 */
router.get("/all-jobs", (req: Request, res: Response) => {
  jobsController.getAllJobs(req, res);
});

/**
 * @swagger
 * /api/jobs/job-details:
 *   get:
 *     summary: Get details of a specific job
 *     tags: [Jobs]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job details
 *       404:
 *         description: Job not found
 */
router.get("/job-details", (req: Request, res: Response) => {
  jobsController.getJobDetails(req, res);
});

/**
 * @swagger
 * /api/jobs/create-job:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               company:
 *                 type: string
 *               salary:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Job created successfully
 *       403:
 *         description: Only admin can create jobs
 */

router.post(
  "/create-job",
  upload.single("image"),
  (req: Request, res: Response) => {
    jobsController.createJobs(req, res);
  },
);

/**
 * @swagger
 * /api/jobs/apply-job:
 *   post:
 *     summary: Apply for a job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully applied to the job
 *       400:
 *         description: Invalid job or already deleted
 */ router.post("/apply-job", (req: Request, res: Response) => {
  jobsController.applyJob(req, res);
});

/**
 * @swagger
 * /api/jobs/applied-jobs:
 *   get:
 *     summary: Get all jobs the user applied for
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of jobs applied by the user
 *       401:
 *         description: Unauthorized
 */
router.get("/applied-jobs", (req: Request, res: Response) => {
  jobsController.getAppliedJobs(req, res);
});

/**
 * @swagger
 * /api/jobs/delete-job/{id}:
 *   patch:
 *     summary: Soft delete a job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job marked as inactive
 *       400:
 *         description: Job ID not found or already inactive
 */
router.patch("/delete-job/:id", (req: Request, res: Response) => {
  jobsController.deleteJob(req, res);
});

export default router;
