import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const dbuser = encodeURIComponent(process.env.DBUSER);
const dbpass = encodeURIComponent(process.env.DBPASS);

// Connect to MongoDB Atlas (recommended for deployment)
mongoose
  .connect(
    `mongodb+srv://${dbuser}:${dbpass}@anaquest.jrelbej.mongodb.net/merncafe?retryWrites=true&w=majority&appName=AnaQuest`
  )
  .then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Routes
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

// Add static file serving
app.use(express.static("public"));
