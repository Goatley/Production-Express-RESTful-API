import express from 'express';
import auth from './routes/auth.js';
import loggedIn from './routes/loggedin.js';

export default function(): express.Router {
    const route = express.Router();

    auth(route);
    loggedIn(route);

    return route;
}
