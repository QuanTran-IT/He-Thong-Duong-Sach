import { Router } from "express";
import { getStalls, createStall, updateStall, deleteStall } from "../controllers/stallController";

const router = Router();

router.get("/", getStalls);
router.post("/", createStall);
router.put("/:id", updateStall);
router.delete("/:id", deleteStall);

export default router;
