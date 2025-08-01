import { Request, Response, Router } from "express";
import { ProfileController } from "../controllers/profile.controller";

const router = Router();
const profileController = new ProfileController();

/**
 * @swagger
 * /api/profile/profile-details:
 *   get:
 *     summary: Get profile details of the logged-in user
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile information
 *       401:
 *         description: Unauthorized or missing token
 */
router.get("/profile-details", (req: Request, res: Response) => {
  profileController.getProfileDetails(req, res);
});

export default router;
