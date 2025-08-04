import db from '../db';
process.env.NODE_ENV = 'test';
import createToken from "./helpers/token";
import { jest } from 'jest';

async function commonBeforeAll() {
    //Clear all data from the test data base
    await db.query("DELETE FROM categories");
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM lists");
    await db.query("DELETE FROM statuses");
    await db.query("DELETE FROM tasks");
    await db.query("DELETE FROM priorities");

    const userResults = await db.query(`
        INSERT INTO users(first_name, last_name, username, email, password, role)
        VALUES()
        `)
}