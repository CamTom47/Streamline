"use strict";

// Shared configuration for application; can be required many places

import dotenv from "dotenv";

dotenv.config();

export const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const PORT = process.env.PORT || 3001;

//Use database, testing database, or via env var, production database

export const getDatabaseUri = () => {
	return process.env.NODE_ENV === "test"
		? "postgresql:///streamline_test"
		: process.env.DATABASE_URL || "postgresql:///streamline";
};

//Change the work factor to speed up testing

export const BCRYPT_WORK_FACTOR = process.env.NOD_ENV === "test" ? 1 : 12;
fk;
