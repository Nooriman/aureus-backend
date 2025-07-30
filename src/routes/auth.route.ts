import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();
const authController = new AuthController();

router.post("/login", (req: Request, res: Response) => {
  authController.login(req, res);
});

router.post("/register", (req: Request, res: Response) => {
  authController.register(req, res);
});

router.post("/logout", (req: Request, res: Response) => {
  authController.logout(req, res);
});

export default router;
