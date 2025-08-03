import { db } from "../../db";
import { BadRequestError, NotFoundError, ExpressError, UnauthorizedError } from "../ExpressError";
import sqlForPartialUpdate from "../helpers/sql";
import { NewCategory, UpdateCategory } from "../types/category-types";

//
class Category {
	static async findAll(userId: number): Promise<{}> {
		const result = await db.query(
			` 
            SELECT id, name
            FROM categories
            WHERE user_id = $1
            OR system_default = $2
    `,
			[userId, true]
		);

		const categories: Category[] = result.rows;
		if (!categories) throw new NotFoundError();
		return categories;
	}

	static async find(categoryId: number): Promise<{}> {
		const results: { rows: {}[] } = await db.query(
			`
        SELECT id, name, user_id
        FROM categories
        WHERE id = $1
    `,
			[categoryId]
		);

		const category = results.rows[0] || {};
		if (!category || Object.keys(category).length === 0)
			throw new NotFoundError(`Category with the id: ${categoryId} was not found.`);
		return category;
	}

	static async create(userId, { name }: NewCategory): Promise<{}> {
		const result = await db.query(
			`
            INSERT INTO categories
            VALUES($1, $2)
            RETURNING id, name, user_id`,
			[name, userId]
		);

		const newCategory = result.rows[0];
		if (!newCategory) throw new BadRequestError();
		return newCategory;
	}

	static async update(categoryId: number, data: UpdateCategory): Promise<{}> {
		const { setCols, values } = sqlForPartialUpdate(data, {
			name: "name",
		});
		const listIdx = `$${values.length + 1}`;
		const sqlQuery = `
        Update categories
        SET ${setCols}
        WHERE id = ${listIdx}
        RETURNING id, name, userId`;
		const result = await db.query(sqlQuery, [...values, categoryId]);
		const updatedCategory = result.rows[0];
		if (!updatedCategory) throw new NotFoundError(`Category with id: ${categoryId} could not be found`);
		return updatedCategory;
	}

	static async delete(categoryId: number): Promise<{}> {
		const result = await db.query(
			`
            DELETE FROM categories
            WHERE id = $1`,
			[categoryId]
		);
		const message = `Status ${categoryId} was successfully deleted`;
		const status = 204;
		return { message, status };
	}
}

export default Category;
