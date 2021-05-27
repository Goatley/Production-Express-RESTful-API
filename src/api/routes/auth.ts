import express from 'express'; 
import IUser from '../../Interfaces/auth/IUser.js';
import IUserInput from '../../Interfaces/auth/IUserInput.js';
import { userAuth } from '../../services/User/auth.js';

const route = express.Router();

export default function (app: express.Router) {
    /**
     * First, let's set up our route for signing up for a new user
     * we will expect to receive a first name, last name, password and email in a post submitted to /signup
     * 
     * We want to include our 'Next Function' in our routes to pass on any errors we retrieve down the line until it hits our error handler
     * 
     * todo enable error handling, create token and respond with it
     */
    route.post('/signup', 
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            //let's create an instance of our auth class
            let auth = new userAuth();
            //first call our user sign up in the service and await it
            let user: IUser = await auth.userSignUp(req.body as IUserInput);

            //then return our results
            res.status(201).json(user)
        } catch(err) {
            next(err);
        }
    })

    app.use('/auth', route);

} 