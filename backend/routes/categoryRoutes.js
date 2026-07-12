import express from "express";

import {
getPublicCategories,
getCategoryDetails
}
from "../controllers/categoryController.js";


const router = express.Router();

router.get(
"/",
getPublicCategories
);

router.get(
"/:id",
getCategoryDetails
);

export default router;