import { Router } from "express";
import { getEvents, createEvent, updateEvent, deleteEvent } from "../controllers/eventController";

const router = Router();

/**
 * @openapi
 * /api/admin/events:
 *   get:
 *     summary: Lấy danh sách sự kiện
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/", getEvents);

/**
 * @openapi
 * /api/admin/events:
 *   post:
 *     summary: Tạo sự kiện mới
 *     tags: [Events]
 *     responses:
 *       201:
 *         description: Tạo thành công
 */
router.post("/", createEvent);

/**
 * @openapi
 * /api/admin/events/{id}:
 *   put:
 *     summary: Cập nhật sự kiện
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put("/:id", updateEvent);

/**
 * @openapi
 * /api/admin/events/{id}:
 *   delete:
 *     summary: Xóa sự kiện
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Xóa thành công
 */
router.delete("/:id", deleteEvent);

export default router;
