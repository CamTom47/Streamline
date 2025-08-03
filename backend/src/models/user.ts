import { db } from "../../db";
import bcrypt from "bcrypt";
import { NewUser, UpdateUser } from "../types/user-types";
import { BadRequestError, NotFoundError } from "../ExpressError";
import { BCRYPT_WORK_FACTOR } from "../../config";
import sqlForPartialUpdate from "../helpers/sql";

class User {
	static async register({
		firstName,
		lastName,
		username,
		email,
		password,
		role = "member",
	}: NewUser){
		//Check to make sure that the requested username is valid
		const usernameExists = await db.query(
			`
            SELECT id, username 
            FROM users 
            WHERE username = $1`,
			[username]
		);

		if (usernameExists) throw new BadRequestError(`Username ${username} is already taken.`);

		const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
		const result = await db.query(
			`
                INSERT INTO users(first_name, last_name, username, email, password, role)
                VALUES($1, $2, $3, $4, $5, $6)
                RETURNING first_name AS "firstName", last_name AS "lastName", username, email,role`,
			[firstName, lastName, username, email, hashedPassword, role]
		);

		const newUser = result.rows[0];
		if (!newUser) throw new BadRequestError(`Invalid information`);
		return newUser;
	}

	static async authenticate(username: string, password: string) {
		const result = await db.query(
			`
            SELECT id, first_name, last_name, username, email, password, is_admin
            FROM users
            WHERE username = $1`,
			[username]
		);
		const user = result.rows[0];

		if (user) {
			const isValid = await bcrypt.compare(password, user.password);
			if (isValid) {
				//if the password is valid with the username, delete the password from the user object so that it is not returned and then return the user object.
				delete user.password;
				return user;
			}
		}

        return new NotFoundError("Invalid Username/Password")
	}

	static async update(userId: number, data: UpdateUser): Promise<{} | void> {
		if (data.password) data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);

		const { setCols, values } = sqlForPartialUpdate(data, {
			firstName: "first_name",
			lastName: "last_name",
			username: "username",
			email: "email",
			password: "password",
			role: "role",
		});

		const userIdx = `$${values.length + 1}`;

		const result = await db.query(
			`
            SET ${setCols}
            WHERE id = ${userIdx}
            RETURNING first_name AS "firstName", last_name AS "lastName", username, email, role`,
			[...values, userId]
		);

		const user = result.rows[0];
		if (!user) throw new NotFoundError(`User with the id: ${userId} does not exist.`);
		return user;
	}

	static async delete(userId: number): Promise<{} | void> {
		const result = await db.query(
			`
            DELETE FROM users
            WHERE id = $1`,
			[userId]
		);

		const user = result.rows[0];
		if (!user) throw new NotFoundError(`User with the id: ${userId} does not exist.`);
		return { message: "User successfully deleted", status: 204 };
	}
}

export default User;
