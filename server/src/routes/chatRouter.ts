import express, { Router } from "express";
import { getMessages, sendMessage } from "../controllers/chatControllers";

const router: Router = express.Router();

router.get("/:id",  getMessages);
router.post("/send/:id", sendMessage);

export default router;
