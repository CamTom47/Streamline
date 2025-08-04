import { db } from "../../db";
import { BadRequestError, NotFoundError, ExpressError, UnauthorizedError } from "../ExpressError";
import sqlForPartialUpdate from "../helpers/sql";

class Priority {
	static async findAll(): Promise<{}> {
		const result = await db.query(` 
            SELECT id, name
            FROM priorities
    `);

		const priorities: Priority[] = result.rows;
		if (!priorities) throw new NotFoundError();
		return priorities;
	}

	static async find(priorityId: number): Promise<{}> {
		const results: { rows: {}[] } = await db.query(
			`
        SELECT id, name, user_id
        FROM priorities
        WHERE id = $1
    `,
			[priorityId]
		);

		const priority = results.rows[0] || {};
		if (!priority || Object.keys(priority).length === 0)
			throw new NotFoundError(`Priority with the id: ${priorityId} was not found.`);
		return priority;
	}
}

export default Priority