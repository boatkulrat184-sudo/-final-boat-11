import express from "express";
import authRouter from "./routes/auth.routes.js";

const PORT = 4000;
const app = express();

app.use(express.json());

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
