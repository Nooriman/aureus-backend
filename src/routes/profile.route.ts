import { Request, Response, Router } from "express";

const router = Router();

router.get("/profile-detail", (req: Request, res: Response) => {
  console.log("profile details ");
});

export default router;
