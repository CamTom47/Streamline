import { db } from "../../db";
import { BadRequestError, NotFoundError, ExpressError, UnauthorizedError } from "../ExpressError";

interface NewTask {
	title: string;
	userid: number;
	category?: number;
	datecreated: Date;
	duedate?: Date;
	priority: number;
	lists?: number[];
	status: number;
	description?: string;
}
interface TaskFilters {
	category?: number;
	dueDateOn?: Date;
	dueDateBefore?: Date;
	dueDateAfter?: Date;
	priority?: number;
	list?: number;
	status?: number;
}
interface TaskSearches {
	tileSearch: Text;
	descriptionSearch: Text;
}

class Task {
	//TODO query for findall
	static async findAll(userId: number, searchParams: TaskSearches, FilterParams: TaskFilters): Promise<{}> {
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

	//TODO query for find
	static async find(userId: number): Promise<{}> {
		const results: { rows: {}[] } = await db.query(
			`
        SELECT id, title, user_id, category, date_created, due_date, priority, lists, status
        FROM tasks
    `,
			[userId]
		);

		const task = results.rows[0] || {};
		if (!task || Object.keys(task).length === 0) throw new NotFoundError();
		return task;
	}
	//TODO query for create
	static async create(data: NewTask): Promise<{}> {
		const { title, userid, category, datecreated, duedate, priority, lists, status, description } = data;

		const result = await db.query(
			`
            INSERT INTO tasks (title, userid, category, datecreated, duedate, priority, lists, status, description)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id, title, user_id AS "userId", category, date_created AS "dateCreated", due_date AS "dueDate", priority, lists, status, description
            `,
			[title, userid, category, datecreated, duedate, priority, lists, status, description]
		);
		const newTask = result.rows[0];
		if (!newTask) throw new BadRequestError();
		return newTask;
	}

	//TODO query for update

	//TODO query for delete
}
