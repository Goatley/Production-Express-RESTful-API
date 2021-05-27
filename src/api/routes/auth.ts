import express from 'express';
import cel from 'celebrate';
import { emailRegex, passwordRegex } from '../../util/regex.js';
import IUser from '../../Interfaces/auth/IUser.js';
import IUserInput from '../../Interfaces/auth/IUserInput.js';
import { UserAuth } from '../../services/User/auth.js';

//funny stuff to get CJS and ESM to work
let { celebrate, Joi, errors } = cel;

const route = express.Router();

export default function (app: express.Router) {
    /**
     * First, let's set up our route for signing up for a new user
     * we will expect to receive a first name, last name, password and email in a post submitted to /signup
     * 
     * We want to include our 'Next Function' in our routes to pass on any errors we retrieve down the line until it hits our error handler
     * 
     * 
     */
    route.post('/signup',
        //Using celebrate (which uses JOI) as a middleware to validate our inputs
        celebrate({
            body: Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string().required().regex(emailRegex),
                password: Joi.string().required().regex(passwordRegex),
            })
        }),
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                //let's create an instance of our auth class
                let auth = new UserAuth();
                //first call our user sign up in the service and await it
                let { user, token } = await auth.userSignUp(req.body as IUserInput);

                //then return our results
                res.status(201).json({user_id: user._id, token})
            } catch(err) {
                //this may be redundent as we could catch the errors later, but we may want custome error handling logic to pass down
                next(err);
            }
        }
    )

    route.post('/signin', 
        //we don't need to validate input against our regex' since we're just matching them, not implementing
        celebrate({
            body: Joi.object({
                email: Joi.string().required(),
                password: Joi.string().required(),
            })
        }),
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                //let's first create an auth class instance
                let auth = new UserAuth();

                let { user, token } = await auth.userSignIn(req.body as IUserInput);

                res.status(200).json({user_id: user._id, token});
            } catch (err) {
                next(err)
            }
        }
    )

    app.use('/auth', route);


} 