import { Request, Response, Router } from "express";

const router = Router();

router.get("/all-jobs", (req: Request, res: Response) => {
  console.log("all-jobs api");
});

router.get("/job-details", (req: Request, res: Response) => {
  console.log("job details");
});

router.post("/apply-job", (req: Request, res: Response) => {
  console.log("apply job");
});

router.get("/applied-jobs", (req: Request, res: Response) => {
  console.log("applied jobs");
});

router.put("/delete-job", (req: Request, res: Response) => {
  console.log("delete job");
});

export default router;
