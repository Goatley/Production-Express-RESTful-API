import express from 'express'
import { verifyToken } from '../middleware/token/verifyToken.js';
import { attachUserToReq } from '../middleware/token/attachUserToReq.js';

export default function loggedIn(app: express.Router) {

    let route = express.Router();

    route.get('/', verifyToken, attachUserToReq, (req: express.Request, res: express.Response) => {
        res.json(`You're successfully signed in as ${req['user'].firstName} ${req['user'].lastName}`)
    })



    app.use('/loggedIn', route)
}