import express from "express";
import { Request, Response, NextFunction } from "express";
const router = express.Router();
import { checkLoggedIn, checkCorrectUserOrAdmin } from "../middleware/auth";
import { Task } from "../models/task";

/**
 * GET ROUTE /tasks
 * Get a list of all authorized tasks
 */
router.get("/", checkCorrectUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { searchParams, FilterParams } = req.params;
		const userId = req.body.user.id;
		const tasks = await Task.findAll(userId, searchParams, FilterParams );
		return res.status(200).json({ tasks });
	} catch (err) {
		return next(err);
	}
});

/**
 * GET ROUTE /tasks/:task
 * Use the details of a specific task
 */
router.get("/:task_id", checkCorrectUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
	try {
        const taskId: number = +req.params.task_id
        const task: object = await Task.find(taskId);
        return res.status(200).json({task})
	} catch (err) {
		return next(err);
	}
});

/**
 * POST ROUTE /tasks/:task
 * Update the details of a specific task
 */
router.patch("/:task_id", checkCorrectUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
	try {
        const taskId: number  = +req.params.task_id;
		const data: object = req.body.data;
		const updatedTask: object = await Task.update(taskId, data);
		return res.status(200).json({updatedTask});
	} catch (err) {
		return next(err);
	}
});

/**
 * POST ROUTE
 * Create a new task
 */
router.post("/", checkCorrectUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data: object = req.body.data;
		const newTask = await Task.create(data);
		return res.status(201).json({newTask});
	} catch (err) {
		return next(err);
	}
});

/**
 * GET ROUTE
 * Delete a task
 */
router.delete("/:task_id", checkCorrectUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const taskId = req.params.task_id;
		const deletedTask = await Task.remove(taskId);
		return res.status(200).json({deletedTask})
	} catch (err) {
		return next(err);
	}
});
