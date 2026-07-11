
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: String,
    instructor: String,
    category: String,
    level: String,
    duration: String,
    price: Number,
    image: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Course", courseSchema);