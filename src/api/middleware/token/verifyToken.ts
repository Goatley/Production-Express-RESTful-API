import express from 'express';
import jwt from 'jsonwebtoken';

/**
 * This function is basically a gatekeeper function on protected routes - it will check 1) if there is a bearer token, and if so, will 2) try to verify it.  The function will throw errors should either of these calls fail, else it will continue the request.
 *
 * @export
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export function verifyToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    let token = getHeaderToken(req);

    if (!token) {
        let err = new Error(`Token not found - please attach tokens in the form of a bearer token on the header.`)
        err['status'] = 401
        return next(err);
    }

    let verified = jwt.verify(token, process.env.SIGNING_SECRET, { complete: true });

    if (!verified) {
        let err = new Error('Token unable to be verified - please sign-in again to generate a new token');
        err['status'] = 401;
        return next(err);
    }

    //let's attach the token to the request body for later
    req['token'] = verified;

    return next();
}


/**
 * This function exists primarily to grab the auth bearer token from the request header and format + return it
 *
 * @param {express.Request} req
 * @return {*} jwt
 */
function getHeaderToken(req: express.Request) {
    if (
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    ) {
        return req.headers.authorization.split(' ')[1]
    }

    return null;
}