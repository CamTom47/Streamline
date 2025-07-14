"use strict";

//database for streamline

import { Client } from "pg";
import { getDatabaseUri } from "./config";

export let db: Client;

if (process.env.NODE_ENV === "production") {
	db = new Client({
		connectionString: getDatabaseUri(),
		ssl: {
			rejectUnauthorized: false,
		},
	});
} else {
	db = new Client({
		connectionString: getDatabaseUri(),
	});
}

db.connect();
