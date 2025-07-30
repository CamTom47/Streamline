import express from "express";
import { Request, Response, NextFunction } from "express";
const router = express.Router();
import { checkLoggedIn, checkCorrectUserOrAdmin } from "../middleware/auth";
import Status from "../models/status";
import { NewTask, UpdateTask, TaskFilters, TaskSorts } from "../types/task-types";
import qs from "qs";

router.get("/", checkCorrectUserOrAdmin, async function (req: Request, res: Response, next: NextFunction) {
	try {
		const userId: number = +req.body.userId;
		const statuses = await Status.findAll(userId);
		return res.status(200).json({ statuses });
	} catch (err) {
		return next(err);
	}
});
router.get("/:status_id", checkCorrectUserOrAdmin, async function (req: Request, res: Response, next: NextFunction) {
	try {
		const statusId: number = +req.body.statusId;
		const userId: number = +req.body.userId;
		const status = await Status.find(userId, statusId);
		if (status) return res.status(200).json({ status });
	} catch (err) {
		return next(err);
	}
});
router.post("/", checkLoggedIn, async function (req: Request, res: Response, next: NextFunction) {});
router.patch(
	"/:status_id",
	checkCorrectUserOrAdmin,
	async function (req: Request, res: Response, next: NextFunction) {}
);
router.delete("/", checkCorrectUserOrAdmin, async function (req: Request, res: Response, next: NextFunction) {});
