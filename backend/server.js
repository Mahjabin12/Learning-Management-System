import express from "express";
import dotenv from "dotenv";
import cors from "cors";


import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import seedUsers from "./utils/seedUsers.js";

dotenv.config();

const app = express();

connectDB().then(() => {
  seedUsers();
});

// CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Byway LMS Backend API is running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});