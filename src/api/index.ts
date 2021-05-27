import express from 'express';
import auth from './routes/auth.js'

export default function(): express.Router {
    const route = express.Router();

    auth(route);

    return route;
}
