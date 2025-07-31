import { Router } from "express";

import authRoute from "./auth.route";
import jobsRoute from "./jobs.route";
import profileRoute from "./profile.route";
import jwtMiddleware from "../middlewares/jwtMiddleware";

const app = Router();

// Public Route
app.use(authRoute);

// Private Route
app.use(jwtMiddleware);
app.use(jobsRoute);
app.use(profileRoute);

module.exports = app;
