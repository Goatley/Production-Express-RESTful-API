import express from 'express';
import UserModel from '../../../models/user.js';

export async function attachUserToReq(req: express.Request, res: express.Response, next: express.NextFunction) {
    let token = req['token'].payload;

    if (!token) {
        let err = new Error('Unable to grab token while trying to attach user to the request.');
        err['status'] = 500;
        next(err);
    }

    try {
        let user = await UserModel.findById(token._id);
        
        if (!user) {
            let err = new Error('Unable to find user associated with this token');
            err['status'] = 401;
            return next(err);
        }

        req['user'] = user;

        return next();
    } catch (err) {
        return next(err)
    }

}