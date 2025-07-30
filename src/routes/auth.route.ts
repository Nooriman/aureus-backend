import { Router, Request, Response } from "express";

const router = Router();

router.post("/login", (req: Request, res: Response) => {
  console.log("login");
});

router.post("/register", (req: Request, res: Response) => {
  console.log("register");
});

router.post("/logout", (req: Request, res: Response) => {
  console.log("logout");
});

export default router;
