import express, { Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
config();
import mongoose from "mongoose";

// routes
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";

mongoose.connect(process.env.MONGO_URL as string);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
