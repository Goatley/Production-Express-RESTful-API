import IUserInput from '../../Interfaces/auth/IUserInput.js';
import IUser from '../../Interfaces/auth/IUser.js';
import ITokenData from '../../Interfaces/auth/ITokenData.js';
import User from '../../models/user.js';
import events from '../../subscribers/events.js';
import emitter from '../../decorators/eventEmitter.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export class userAuth {

    // private _emitter: Object;

    /**
     * todo dependency injection for our emitter
     */
    public constructor() {
        // this._emitter = emitter;
    }


    /**
     * createUser intakes an IUserInput object received via a post request or form submission, and attempts to create a new user in our database.  Upon success, it will kick off the 'User Signup' event for any subscribers to process
     *
     * @export
     * @param {IUserInput} userInput - input received either via a post request or form submission from a front end
     * @return {*}  {Promise<IUser>} Returns a promise of a User object to attach to our request to authenticate the new user
     */
    public async userSignUp(userInput: IUserInput): Promise<IUser> {

        /**
         * First, let's do a quick rough check to ensure that we at least have fields supplied
         * todo will probably want to replace with some variation of a parameter checking npm package - thinking Joi
         */
        if (!userInput.firstName || !userInput.lastName || !userInput.password || !userInput.email) {
            let err = new Error(`Please make sure you provide a valid first name, last name, email address and password for a new account.`)
            err['status'] = 400;
            throw err;
        }

        /**
         * First, let's check to see if the user associated with this email already exists (it's basically a pseudo primary key - only one user per email allowed)
         * 
         * Throw an error if it's duplicated and let them know.
         * todo will want to add 'forgot password' functionality
         */
        if (await User.findOne({ email: userInput.email })) {
            let err = new Error(`An account for the email ${userInput.email} already exists.  Did you forget your password?`);
            err['status'] = 409;
            throw err;
        }

        /**
         * let's attempt to actually create a user in our database; we should have already validated the incoming information.
         * 
         * First, we need to generate a saltelt hash for their password to store in our DB, so we can verify on future sign in.
         * TO REITERATE - we DO NOT want to store their password in our DB... even after it's encrypted.  We want to salt + hash the password and store that.  Then, when they sign in in the future, we'll use the same salt + hashing algorithm on their entered password, and compare the final results to see if they are equivalent
         */
        userInput['salt'] = await bcrypt.genSalt();
        userInput['hash'] = await bcrypt.hash(userInput.password, userInput['salt']);

        let { _id, firstName, lastName, email } = await User.create(userInput);

        /**
         * If we were able to make a user, let's generate a token and send it back to them
         * todo - in the future, we can try to generate both a regular access token and a refresh token and establish automatic refreshing
         */
        let token = this.generateToken({ _id, firstName, lastName, email } as ITokenData);


        /**
         * if we were successful, let's emit an event called 'userSignUp' now so any subscribers listening can now kick off their services
         */
        emitter.emit(events.user.signUp, { _id, firstName, lastName, email, token });

        return { _id, firstName, lastName, email, token };
    }


    public generateToken(tokenData: ITokenData): string {
        /**
         * let's generate a token that expires in default after an hour
         * todo - make our function also generate a refresh token along with the access token
         */
        let token = jwt.sign(tokenData, process.env.SIGNING_SECRET, {
            expiresIn: 3600
        })

        return token
    }


}

