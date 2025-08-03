import express from "express";
const router = express.Router();
import { Request, Response, NextFunction } from "express";
import { checkLoggedIn, checkCorrectUserOrAdmin } from "../middleware/auth";
import Status from "../models/status";
import { NewStatus, UpdateStatus } from "../types/status-types";
import jsonschema from "jsonschema";
import newStatusSchema from "../schema/status/newStatusSchema.json";
import updateStatusSchema from "../schema/status/updateStatusSchema.json";
import { BadRequestError } from "../ExpressError";

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
router.post("/", checkLoggedIn, async function (req: Request, res: Response, next: NextFunction): Promise<{} | void> {
	try {
		const userId: number = +req.body.userId;
		const data: NewStatus = req.body;
		const dataValidator = jsonschema.validate(req.body, newStatusSchema);
		if (!dataValidator.valid) {
			const errs: any = dataValidator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}
		const newStatus = await Status.create(userId, data);
		if (newStatus) return res.status(201).json({ newStatus });
	} catch (err) {
		return next(err);
	}
});

router.patch("/:status_id", checkCorrectUserOrAdmin, async function (req: Request, res: Response, next: NextFunction) {
	try {
		const statusId = +req.params.body;
		const data: UpdateStatus = req.body;
		const dataValidator = jsonschema.validate(req.body, updateStatusSchema);
		if (!dataValidator.valid) {
			const errs: any = dataValidator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}
		const updatedStatus = await Status.update(statusId, data);
		if (updatedStatus) return res.status(200).json({ updatedStatus });
	} catch (err) {
		return new err();
	}
});
router.delete("/", checkCorrectUserOrAdmin, async function (req: Request, res: Response, next: NextFunction) {
	try {
		const statusId = +req.params.body;
		const deletedStatus = await Status.delete(statusId);
		if (deletedStatus) return res.status(204).json({ deletedStatus });
	} catch (err) {
		return new err();
	}
});
