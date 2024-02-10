import express, { Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
config();
import mongoose from "mongoose";

// routes
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";

const mongoUrl =
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_URL_TEST
    : process.env.MONGO_URL;

mongoose.connect(mongoUrl as string).then(() => console.log("Connected to db"));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/health", async (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
