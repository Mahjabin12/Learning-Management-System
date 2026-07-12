import express from "express";

import {
applyInstructor
}
from "../controllers/instructorController.js";


import {protect}
from "../middleware/authMiddleware.js";


const router = express.Router();



router.post(
"/apply",
protect,
applyInstructor
);



export default router;