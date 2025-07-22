import { db } from "../../db";
import { BadRequestError, NotFoundError, ExpressError, UnauthorizedError } from "../ExpressError";
import sqlForPartialUpdate from "../helpers/sql";

interface NewList {
    title: String;
    user_id: Number;
    description: String
}
interface UpdateList {
	title: String;
    description: String;
}
interface SortParams {
	title: number;
}

class List {
	static async findAll(userId: number, sortParams: SortParams): Promise<{}> {
		let query: string = `
        SELECT id, title, date_created, user_id, description
        FROM statuses
    `;

		const whereExpressions: string[] = [];
		const queryValues: any[] = [];

        const sortExpression: string[] = [];
        const sortValues: string[] = [];


        //check conditionals to add to sort expressions and sort values;
        if(sortParams.title){
            sortValues.push(sortParams.title)   
        }

		//check conditionals to add to where expressions and query values;

		//#region Filter Functionality
		//check for specific key-values from
		if (userId) {
			queryValues.push(userId);
			whereExpressions.push(`user_id = $${queryValues.length}`);
		}

		if (sortParams.title) {
			queryValues.push(sortParams.id);
			whereExpressions.push(`id = ${whereExpressions.length}`);
		}

		if (whereExpressions.length) {
			if(whereExpressions.length === 1){
             (query += `\nWHERE` + whereExpressions[0])
            } else {
              (query += `\nWHERE` + whereExpressions.join(" OR "));
            }
            query += ` AND system_default = true`
		}
		const result = await db.query(query, queryValues);
		const statuses: Status[] = result.rows;
		if (!statuses) throw new NotFoundError();
		return statuses;
	}

	//#endregion

	static async find(userId: number, taskId: number): Promise<{}> {
		const results: { rows: {}[] } = await db.query(
			`
        SELECT id, name, user_id
        FROM statuses
        WHERE user_id = $1 AND id = $2
    `,
			[userId, taskId]
		);

		const status = results.rows[0] || {};
		if (!status || Object.keys(status).length === 0) throw new NotFoundError();
		return status;
	}

	static async create(userId: number, {name, system_default = false}: NewStatus): Promise<{}> {

		const result = await db.query(
			`
            INSERT INTO statuses (name, user_id, system_default)
            VALUES($1, $2, $3)
            RETURNING id, name, user_id AS "userId"
            `,
			[name, userId, system_default]
		);
		const newStatus = result.rows[0];
		if (!newStatus) throw new BadRequestError();
		return newStatus;
	}

	static async update(status_id: number, data: UpdateStatus): Promise<{}> {
		const { setCols, values } = sqlForPartialUpdate(data, {
			name: "name",
		});

		const statusIdx = `$${values.length + 1}`;

		const sqlQuery = `
			UPDATE statuses
			SET ${setCols}
			WHERE id ${statusIdx}
			RETURNING *
			`;

		const result = await db.query(sqlQuery, [...values, status_id]);

		const status = result.rows[0];
		if (!status) throw new NotFoundError();
		return status;
	}

	static async delete(status_id: number): Promise<{}> {
		const result = await db.query(
			`
		DELETE FROM statuses
		WHERE id = $1`,
			[status_id]
		);
		const message = `Status ${status_id} was successfully deleted`;
		const status = 200;
		return { message, status };
	}
}
