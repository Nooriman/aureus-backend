import { Request, Response, Router } from "express";
import { ProfileController } from "../controllers/profile.controller";

const router = Router();
const profileController = new ProfileController();

router.get("/profile-details", (req: Request, res: Response) => {
  profileController.getProfileDetails(req, res);
});

export default router;
