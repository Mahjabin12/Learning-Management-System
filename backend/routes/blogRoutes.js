import express from "express";
import {
  getBlogs,
  getBlogById,
  createBlog,
} from "../controllers/blogController.js";

const router = express.Router();

// GET all blogs
router.get("/", getBlogs);

// GET single blog
router.get("/:id", getBlogById);

// POST new blog
router.post("/", createBlog);

export default router;