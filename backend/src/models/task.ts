import { db } from "../../db";
import { BadRequestError, NotFoundError, ExpressError, UnauthorizedError } from "../ExpressError";
import sqlForPartialUpdate from "../helpers/sql";
import { NewTask, UpdateTask, TaskFilters, TaskSorts } from "../types/task-types";

class Task {
	//TODO query for findall
	static async findAll(userId: number, searchParams: TaskSorts, FilterParams: TaskFilters): Promise<{}> {
		let query: string = `
        SELECT id, title, user_id, category, date_created, due_date, priority, lists, status
        FROM tasks
    `;

		const whereExpressions: string[] = [];
		const queryValues: any[] = [];

		//check conditionals to add to where expressions and query values;

		//#region Filter Functionality
		//check for specific key-values from
		if (userId) {
			queryValues.push(userId);
			whereExpressions.push(`user_id = $${queryValues.length}`);
		}

		if (FilterParams.category) {
			queryValues.push(FilterParams.category);
			whereExpressions.push(`category = ${whereExpressions.length}`);
		}
		if (FilterParams.dueDateOn) {
			queryValues.push(FilterParams.dueDateOn);
			whereExpressions.push(`due_date = ${whereExpressions.length}`);
		}
		if (FilterParams.dueDateBefore) {
			queryValues.push(FilterParams.dueDateBefore);
			whereExpressions.push(`due_date < ${whereExpressions.length}`);
		}
		if (FilterParams.dueDateAfter) {
			queryValues.push(FilterParams.dueDateAfter);
			whereExpressions.push(`due_date > ${whereExpressions.length}`);
		}
		if (FilterParams.priority) {
			queryValues.push(FilterParams.priority);
			whereExpressions.push(`priority = ${whereExpressions.length}`);
		}
		if (FilterParams.list) {
			queryValues.push(FilterParams.list);
			whereExpressions.push(`list = ${whereExpressions.length}`);
		}
		if (FilterParams.status) {
			queryValues.push(FilterParams.status);
			whereExpressions.push(`status = ${whereExpressions.length}`);
		}

		if (whereExpressions.length) {
			whereExpressions.length === 1
				? (query += `\nWHERE` + whereExpressions[0])
				: (query += `\nWHERE` + whereExpressions.join(" OR "));
		}
		const result = await db.query(query, queryValues);
		const tasks: Task[] = result.rows;
		if (!tasks) throw new NotFoundError();
		return tasks;
	}

	//#endregion

	static async find(userId: number, taskId): Promise<{}> {
		const results: { rows: {}[] } = await db.query(
			`
        SELECT id, title, user_id, category, date_created, due_date, priority, lists, status
        FROM tasks
		WHERE user_id = $1 AND id = $2
    `,
			[userId, taskId]
		);

		const task = results.rows[0] || {};
		if (!task || Object.keys(task).length === 0) throw new NotFoundError();
		return task;
	}

	static async create(data: NewTask): Promise<{}> {
		const { title, userid, category, datecreated, duedate, priority, lists, status, description } = data;

		const result = await db.query(
			`
            INSERT INTO tasks (title, user_id, category, date_created, due_date, priority, lists, status, description)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id, title, user_id AS "userId", category, date_created AS "dateCreated", due_date AS "dueDate", priority, lists, status, description
            `,
			[title, userid, category, datecreated, duedate, priority, lists, status, description]
		);
		const newTask = result.rows[0];
		if (!newTask) throw new BadRequestError();

		if (category) {
		}

		const taskCategoryQuery = await db.query(
			`
		INSERT INTO tasks_categories (task_id, category_id)
		VALUES ($1, $2)
		RETURNING id, task_id, category_id
		`,
			[newTask.id, category]
		);
		return newTask;
	}

	static async update(task_id: number, data: UpdateTask): Promise<{}> {
		const { setCols, values } = sqlForPartialUpdate(data, {
			duedate: "due_date",
		});

		const taskIdx = `$${values.length + 1}`;

		const sqlQuery = `
			UPDATE tasks
			SET ${setCols}
			WHERE id ${taskIdx}
			RETURNING *
			`;

		const result = await db.query(sqlQuery, [...values, task_id]);

		const updatedTask = result.rows[0];
		if (!updatedTask) throw new NotFoundError();

		if (updatedTask) {
			const updatedTaskCategoryQuery = await db.query(
				`
				UPDATE tasks_categories
				SET category_id = $1
				WHERE id = $2
				RETURNING *
				`,
				[data.category, updatedTask.id]
			);
		}
		return updatedTask;
	}

	static async delete(task_id: number): Promise<{}> {
		const result = await db.query(
			`
		DELETE FROM tasks
		WHERE id = $1`,
			[task_id]
		);
		const message = `Task ${task_id} was successfully deleted`;
		const status = 200;
		return { message, status };
	}
}

export default Task;
