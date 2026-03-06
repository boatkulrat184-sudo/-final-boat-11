import express from "express";
import authRouter from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const PORT = 4000;
const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
