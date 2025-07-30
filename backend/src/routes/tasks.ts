import express from "express";
import { Request, Response, NextFunction } from "express";
const router = express.Router();
import { checkLoggedIn, checkCorrectUserOrAdmin } from "../middleware/auth";
import Task from "../models/task";
import { NewTask, UpdateTask, TaskFilters, TaskSorts } from "../types/task-types";
import qs from "qs";

/**
 * PLAN FOR FILTER AND SORTING
 * //https://www.localhost3001/tasks?list=1&status=2&sort=name&order=desc
		//list=1&status=2&sort=name&order=desc
		//list=1&status=2
		//sort=name&order=desc


	/**
	 * {
	 * list: 1,
	 * status: 2,
	 * }
	 * {
	 * sort: name,
	 * order: desc
	 * }
	 */

/**
 * GET ROUTE /tasks
 * Get a list of all authorized tasks
 */
router.get("/", checkCorrectUserOrAdmin, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const urlParams: string = req.query.toString();
		const filterParams: TaskFilters = qs.parse(urlParams.slice(0, urlParams.indexOf("sort") - 1));
		const sortParams: TaskSorts = qs.parse(urlParams.slice(urlParams.indexOf("sort")));
		const userId = req.body.user.id;
		const tasks = await Task.findAll(userId, sortParams, filterParams);
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
		const taskId: number = +req.params.task_id;
		const userId: number = +req.body.user_id;
		const task: object = await Task.find(userId, taskId);
		return res.status(200).json({ task });
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
		const taskId: number = +req.params.task_id;
		const data: UpdateTask = req.body.data;
		const updatedTask: object = await Task.update(taskId, data);
		return res.status(200).json({ updatedTask });
	} catch (err) {
		return next(err);
	}
});

/**
 * POST ROUTE
 * Create a new task
 */
router.post("/", checkLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data: NewTask = req.body.data;
		const newTask = await Task.create(data);
		return res.status(201).json({ newTask });
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
		const taskId = +req.params.task_id;
		const deletedTask = await Task.delete(taskId);
		return res.status(200).json({ deletedTask });
	} catch (err) {
		return next(err);
	}
});
