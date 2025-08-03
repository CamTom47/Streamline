import express, { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../ExpressError";
import { checkLoggedIn, checkAdmin, checkCorrectUserOrAdmin } from "../middleware/auth";
import Priority from "../models/priority";
import jsonschema from "jsonschema";

const router = express.Router();

router.get("/", checkLoggedIn, async function (req: Request, res: Response, next: NextFunction): Promise<{} | void> {
	try {
		const priorities = await Priority.findAll();
		return res.status(200).json({ priorities });
	} catch (err) {
		return next(err);
	}
});

router.get("/:priority_id", checkLoggedIn, async function (req: Request, res: Response, next: NextFunction) {
	try {
		const priorityId: number = +req.params.priority_id;
		const priority = await Priority.find(priorityId);
		return res.status(200).json({ priority });
	} catch (err) {
		return next(err);
	}
});
