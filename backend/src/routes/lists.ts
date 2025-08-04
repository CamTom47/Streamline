import express, { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../ExpressError";
import { checkLoggedIn, checkAdmin, checkCorrectUserOrAdmin } from "../middleware/auth";
import List from "@/models/list/list"
import jsonschema from "jsonschema";
import newListSchema from "../schema/list/newListSchema.json";
import updateListSchema from "../schema/list/updateListSchema.json";

const router = express.Router();

router.get("/", checkLoggedIn, async function (req: Request, res: Response, next: NextFunction): Promise<{} | void> {
	try {
		const userId: number = +req.body.userId;
		const categories = await List.findAll(userId);
		return res.status(200).json({ categories });
	} catch (err) {
		return next(err);
	}
});

router.get("/:list_id", checkCorrectUserOrAdmin, async function (req: Request, res: Response, next: NextFunction) {
	try {
		const listId: number = +req.params.list_id;
		const list = await List.find(listId);
		return res.status(200).json({ list });
	} catch (err) {
		return next(err);
	}
});

router.post("/", checkLoggedIn, async function (req: Request, res: Response, next: NextFunction) {
	try {
		const userId: number = +req.body.userId;
		const data = req.body;
		const dataValidator = jsonschema.validate(newListSchema, data);
		if (!dataValidator.valid) {
			const errs: any = dataValidator.errors.map((err) => err.stack);
			throw new BadRequestError(errs);
		}
		const newList = await List.create(data);
		return res.status(200).json({ newList });
	} catch (err) {
		return next(err);
	}
});

router.patch("/list_id", checkCorrectUserOrAdmin, async function (req: Request, res: Response, next: NextFunction) {
	try {
		const listId: number = +req.params.list_id;
		const data = req.body;
		const dataValidator = jsonschema.validate(updateListSchema, data);
		if (!dataValidator.valid) {
			const errs: any = dataValidator.errors.map((err) => err.stack);
			throw new BadRequestError(errs);
		}
		const updatedList = await List.update(listId, data);
		return res.status(200).json({ updatedList });
	} catch (err) {
		return next(err);
	}
});

router.delete("/list_id", checkCorrectUserOrAdmin, async function (req: Request, res: Response, next: NextFunction) {
	try {
		const listId: number = +req.params.list_id;
		const deletedList = await List.delete(listId);
		return res.status(204).json({ deletedList });
	} catch (err) {
		return next(err);
	}
});
