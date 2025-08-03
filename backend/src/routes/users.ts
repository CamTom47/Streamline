import express, { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../ExpressError";
import { checkCorrectUserOrAdmin } from "../middleware/auth";
import User from "../models/user";
import jsonschema from "jsonschema";
import updateUserSchema from "../schema/user/updateUserSchema.json";

const router = express.Router();

router.patch("/:user_id", checkCorrectUserOrAdmin, async function (req: Request, res: Response, next: NextFunction) {
	try {
		const userId: number = +req.params.user_id;
		const data = req.body;
		const dataValidator = jsonschema.validate(updateUserSchema, data);
		if (!dataValidator.valid) {
			const errs: any = dataValidator.errors.map((err) => err.stack);
			throw new BadRequestError(errs);
		}
		const updatedUser = await User.update(userId, data);
		return res.status(200).json({ updatedUser });
	} catch (err) {
		return next(err);
	}
});

router.delete("/:user_id", checkCorrectUserOrAdmin, async function (req: Request, res: Response, next: NextFunction) {
	try {
		const userId: number = +req.params.user_id;
		const deletedUser = await User.delete(userId);
		return res.status(204).json({ deletedUser });
	} catch (err) {
		return next(err);
	}
});
