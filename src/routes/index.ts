import { Router } from "express";

import authRoute from "./auth.route";
import jobsRoute from "./jobs.route";
import profileRoute from "./profile.route";

const app = Router();

// Public Route
app.use(authRoute);

// Private Route
app.use(jobsRoute);
app.use(profileRoute);
