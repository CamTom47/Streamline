import { db } from "../../db";
import { BadRequestError, NotFoundError, ExpressError, UnauthorizedError } from "../ExpressError";

class Category {
    static async findAll(): Promise<{}> {
        const result = await db.query(` 
            SELECT id, name
            FROM categories
    `);

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
}

export default Category