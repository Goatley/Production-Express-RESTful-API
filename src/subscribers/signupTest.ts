import emitter from '../decorators/eventEmitter.js';
import events from './events.js';
import IUser from '../Interfaces/auth/IUser.js';
import Logger from '../loaders/logger.js';


export default class signUpSubscriber{
    constructor() {
        emitter.on(events.user.signUp, this.onUserSignUp);
    }

    private onUserSignUp(user: IUser) {
        Logger.info(`${user.firstName} ${user.lastName} has signed up with email: ${user.email}.  Their Id is ${user._id}`)
    }
}