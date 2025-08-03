import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import newUserSchema from '../schema/user/newUserSchema.json';
import updateUserSchema from '../schema/user/updateUserSchema.json';

const router = express.Router();

router.post('/login', async function(req: Request, res: Response, next: NextFunction){
    try{


        

        return token;

    } catch(err){
        return next(err);
    }
});

router.post('/register', async function(req: Request, res: Response, next:NextFunction){
    try{

    } catch (err) {
        return next(err);
    }
})