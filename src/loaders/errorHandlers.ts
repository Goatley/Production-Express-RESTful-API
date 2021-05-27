import { Application } from 'express';
import Logger from '../loaders/logger.js';

export default async function errorHandlerLoader(app: Application) {
    function errorHandler(err, req, res, next) {

        Logger.error({ status: err.status, stack: err.stack })

        res.status(err.status || 500);
        res.send({ message: 'We encountered an error', error: err.message })
    }

    app.use(errorHandler);
}