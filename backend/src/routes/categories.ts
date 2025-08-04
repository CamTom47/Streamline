import express, { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../ExpressError";
import { checkLoggedIn, checkAdmin, checkCorrectUserOrAdmin } from "../middleware/auth";
import Category from "../models/category/category";
import jsonschema from "jsonschema";
import newCategorySchema from "../schema/category/newCategorySchema.json";
import updateCategorySchema from "../schema/category/updateCategorySchema.json";

const router = express.Router();

router.get(
	"/",
	checkCorrectUserOrAdmin,
	async function (req: Request, res: Response, next: NextFunction): Promise<{} | void> {
		try {
			const userId: number = +req.body.userId;
			const categories = await Category.findAll(userId);
			return res.status(200).json({ categories });
		} catch (err) {
			return next(err);
		}
	}
);

router.get("/:category_id", checkCorrectUserOrAdmin, async function (req: Request, res: Response, next: NextFunction) {
	try {
		const userId: number = +req.body.userId;
		const categoryId: number = +req.params.category_id;
		const category = await Category.find(categoryId);
		return res.status(200).json({ category });
	} catch (err) {
		return next(err);
	}
});

router.post("/", checkLoggedIn, async function (req: Request, res: Response, next: NextFunction) {
	try {
		const userId: number = +req.body.userId;
		const data = req.body;
		const dataValidator = jsonschema.validate(newCategorySchema, data);
		if (!dataValidator.valid) {
			const errs: any = dataValidator.errors.map((err) => err.stack);
			throw new BadRequestError(errs);
		}
		const newCategory = await Category.create(userId, data);
		return res.status(200).json({ newCategory });
	} catch (err) {
		return next(err);
	}
});

router.patch("/category_id", checkCorrectUserOrAdmin, async function (req: Request, res: Response, next: NextFunction) {
	try {
		const categoryId: number = +req.params.category_id;
		const data = req.body;
		const dataValidator = jsonschema.validate(updateCategorySchema, data);
		if (!dataValidator.valid) {
			const errs: any = dataValidator.errors.map((err) => err.stack);
			throw new BadRequestError(errs);
		}
		const updatedCategory = await Category.update(categoryId, data);
		return res.status(200).json({ updatedCategory });
	} catch (err) {
		return next(err);
	}
});

router.delete(
	"/category_id",
	checkCorrectUserOrAdmin,
	async function (req: Request, res: Response, next: NextFunction) {
		try {
			const categoryId: number = +req.params.category_id;
			const deletedCategory = await Category.delete(categoryId);
			return res.status(204).json({ deletedCategory });
		} catch (err) {
			return next(err);
		}
	}
);
