import cookieParser from "cookie-parser";
import { setupSwagger } from "./config/swaggerConfig";

const express = require("express");
const apiRoutes = require("./routes");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", apiRoutes);

setupSwagger(app);

app.listen(Number(PORT), () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
