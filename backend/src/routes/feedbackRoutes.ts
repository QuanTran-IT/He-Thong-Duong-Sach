import { Router } from "express";
import { getFeedbacks, updateFeedbackStatus } from "../controllers/feedbackController";

const router = Router();

router.get("/", getFeedbacks);
router.put("/:id/status", updateFeedbackStatus);

export default router;
