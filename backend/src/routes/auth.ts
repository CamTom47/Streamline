import express, { Request, Response, NextFunction } from "express";
import User from "../models/user";
import loginSchema from "../schema/auth/loginSchema.json";
import newUserSchema from "../schema/auth/newUserSchema.json";
import jsonschema from "jsonschema";
import createToken from "../helpers/token";
import { BadRequestError } from "../ExpressError";

const router = express.Router();

router.post("/login", async function (req: Request, res: Response, next: NextFunction) {
	try {
		const { username, password } = req.body;

		const dataValidator = jsonschema.validate(req.body, loginSchema);

		if (!dataValidator.valid) {
			const errs: any = dataValidator.errors.map((err) => err.stack);
			throw new BadRequestError();
		}

		const user = await User.authenticate(username, password);
		const token = createToken(user);
		return res.status(200).json({ token });
	} catch (err) {
		return next(err);
	}
});

router.post("/register", async function (req: Request, res: Response, next: NextFunction) {
	try {
		const data = req.body;

		const dataValidator = jsonschema.validate(data, newUserSchema);
		if (!dataValidator.valid) {
			const errs: any = dataValidator.errors.map((err) => err.stack);
			throw new BadRequestError(errs);
		}

		const newUser = await User.register(data);
		const token = createToken(newUser);
		return res.status(201).json({ token });
	} catch (err) {
		return next(err);
	}
});

export default router;
