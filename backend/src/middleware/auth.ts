'use strict'

import jwt from 'jsonwebtoken';
import { SECRET_KEY } from "../../config";
import { Request, Response, NextFunction } from "express";



const checkLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    
}

//TODO create function for admin

const checkAdmin = (req: Request, res: Response, next: NextFunction) => {

}

//TODO create function for correct user or admin
const checkCorrectUserOrAdmin = (req: Request, res: Response, next: NextFunction) => {

}