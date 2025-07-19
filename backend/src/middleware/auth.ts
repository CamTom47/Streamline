"use strict";

import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../config";
import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../ExpressError";

/**
 * Authenticate a user's JWT header if present and set the validated response on the res.locals.
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization;
		if (authHeader) {
			const token = authHeader.replace(/^[Bb]earer/, "").trim();
			res.locals.user = jwt.verify(token, SECRET_KEY);
		}
		return next;
	} catch (err) {
		return next(err);
	}
};

/**
 * check that a user is logged in
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const checkLoggedIn = (req: Request, res: Response, next: NextFunction) => {
	try{
        if(!res.locals.user) throw new UnauthorizedError();
    } catch(err){
        return next(err);
    }
};

/**
 * Check that a user has admin permissions
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    try{
        if(!res.locals.user.isAdmin) throw new UnauthorizedError();
        return next();
    } catch(err){
        return next(err);
    }
};

/**
 * check that a user is an admin or that the resources requested belong to the user making the request.
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const checkCorrectUserOrAdmin = (req: Request, res: Response, next: NextFunction) => {
    try{
        const user = res.locals.user;
        if(!(user && (req.params.username === user.username || user.isAdmin)))throw new UnauthorizedError();
    } catch(err){
        return next(err);
    }
};
