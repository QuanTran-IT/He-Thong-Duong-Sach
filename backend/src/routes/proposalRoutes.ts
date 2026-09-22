import { Router } from "express";
import { getProposals, getProposalById, updateProposalStatus } from "../controllers/proposalController";

const router = Router();

/**
 * @openapi
 * /api/admin/proposals:
 *   get:
 *     summary: Lấy danh sách hồ sơ đề xuất
 *     description: Lấy danh sách toàn bộ hồ sơ, hỗ trợ lọc theo trạng thái và ngày.
 *     tags: [Proposals]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Trạng thái hồ sơ (VD pending, approved, rejected)
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         description: Ngày diễn ra
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/", getProposals);

/**
 * @openapi
 * /api/admin/proposals/{id}:
 *   get:
 *     summary: Xem chi tiết hồ sơ
 *     tags: [Proposals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy hồ sơ
 */
router.get("/:id", getProposalById);

/**
 * @openapi
 * /api/admin/proposals/{id}/{action}:
 *   post:
 *     summary: Duyệt hoặc thay đổi trạng thái hồ sơ
 *     description: Đổi trạng thái hồ sơ. Nếu là request-supplement hoặc reject thì body bắt buộc phải có thuộc tính `note`.
 *     tags: [Proposals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: action
 *         required: true
 *         schema:
 *           type: string
 *           enum: [approve, request-supplement, reject]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               note:
 *                 type: string
 *                 description: Ghi chú hoặc lý do (bắt buộc khi trả bổ sung hoặc từ chối)
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Thiếu note hoặc action không hợp lệ
 *       404:
 *         description: Không tìm thấy hồ sơ
 */
router.post("/:id/:action", updateProposalStatus);

export default router;
