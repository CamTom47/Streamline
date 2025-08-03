export interface NewUser {
	firstName: string;
	lastName: string;
	email: string;
	username: string;
	password: string;
	role: string;
}

export interface UpdateUser {
	firstName?: string;
	lastName?: string;
	email?: string;
	username?: string;
	password?: string;
}
