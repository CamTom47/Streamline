"use strict";

import { Request, Response, NextFunction } from "express";

import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import express, { Express } from "express";

export const app: Express = express();
dotenv.config();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(function (req: Request, res: Response, next: NextFunction) {
	// return next(new NotFoundError());
});

app.use(function (err, req: Request, res: Response, next: NextFunction) {
	if (process.env.NODE_ENV !== "test") console.error(err.stack);
	const status = err.status || 500;
	const message = err.message;

	return res.status(status).json({
		error: { message, status },
	});
});
