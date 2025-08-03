import { db } from "../../db";
import { BadRequestError, NotFoundError, ExpressError, UnauthorizedError } from "../ExpressError";
import sqlForPartialUpdate from "../helpers/sql";

interface NewList {
	title: string;
	userId: number;
	description: string;
	systemDefault: boolean;
}
interface UpdatedList {
	title: string;
	description: string;
}

class List {
	static async findAll(userId: number): Promise<{}> {
		let query: string = `
        SELECT id, title, date_created, user_id AS "userId", description
        FROM lists
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

		if (whereExpressions.length) {
			if (whereExpressions.length === 1) {
				query += `\nWHERE` + whereExpressions[0];
			} else {
				query += `\nWHERE` + whereExpressions.join(" OR ");
			}
		}
		//#endregion

		const result = await db.query(query, queryValues);
		const lists: List[] = result.rows;
		if (!lists) throw new NotFoundError();
		return lists;
	}

	static async find(listId: number): Promise<{}> {
		const results: { rows: {}[] } = await db.query(
			`
        SELECT id, title, date_created, description, user_id AS "userId"
        FROM lists
        WHERE id = $1
    `,
			[listId]
		);

		const status = results.rows[0] || {};
		if (!status || Object.keys(status).length === 0) throw new NotFoundError();
		return status;
	}

	static async create({ title, systemDefault = false, description, userId }: NewList): Promise<{}> {
		const result = await db.query(
			`
            INSERT INTO lists (title, user_id, system_default, description)
            VALUES($1, $2, $3, $4)
            RETURNING id, title, user_id AS "userId", description
            `,
			[title, userId, systemDefault, description]
		);
		const newList = result.rows[0];
		if (!newList) throw new BadRequestError();
		return newList;
	}

	static async update(list_id: number, data: UpdatedList): Promise<{}> {
		const { setCols, values } = sqlForPartialUpdate(data, {
			title: "title",
			description: "description",
		});

		const listIdx = `$${values.length + 1}`;

		const sqlQuery = `
			UPDATE lists
			SET ${setCols}
			WHERE id ${listIdx}
			RETURNING id, title, user_id AS "userId", description
			`;

		const result = await db.query(sqlQuery, [...values, list_id]);

		const list = result.rows[0];
		if (!list) throw new NotFoundError();
		return list;
	}

	static async delete(list_id: number): Promise<{}> {
		const result = await db.query(
			`
		DELETE FROM lists
		WHERE id = $1`,
			[list_id]
		);
		const message = `Status ${list_id} was successfully deleted`;
		const status = 200;
		return { message, status };
	}
}

export default List;
