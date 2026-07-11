import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import seedUsers from "./utils/seedUsers.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();
const result = dotenv.config();

console.log(result);
console.log("MONGO_URI =", process.env.MONGO_URI);

const app = express();

connectDB().then(() => {
  seedUsers();
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Byway LMS Backend API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});