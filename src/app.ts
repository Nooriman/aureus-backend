const express = require("express");
const apiRoutes = require("./routes");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

const { PORT } = process.env;

app.use(express.json());

app.use("/api", apiRoutes);

app.listen(Number(PORT), () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
