import express from "express";
import {
  createContact,
  getAllContacts,
} from "../controllers/contactController.js";

const router = express.Router();

// Send Contact Message
router.post("/", createContact);

// Get All Contact Messages (Admin)
router.get("/", getAllContacts);

export default router;