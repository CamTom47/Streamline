
export class ExpressError extends Error {
	message: string;
	status: number;
	constructor(message: string, status: number) {
		super();
		this.message = message;
		this.status = status;
	}
}
//404 Not Found

export class NotFoundError extends ExpressError {
	constructor(message = "Not Found") {
		super(message, 404);
	}
}

//400 Bad Request
export class BadRequestError extends ExpressError {
	constructor(message = "Bad Request") {
		super(message, 400);
	}
}

//401 Unauthorized
export class UnauthorizedError extends ExpressError {
	constructor(message = "Unauthorized") {
		super(message, 401);
	}
}
