import express from 'express';
import cel from 'celebrate';
import Logger from '../loaders/logger.js';

//getting around annoying CJS to ESM stuff
const { errors } = cel;

export default async function errorHandlerLoader(app: express.Application) {
    function errorHandler(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {

        Logger.error({ status: err.status, stack: err.stack })

        res.status(err.status || 500);
        res.json({ message: err.message })
    }

    //enabling Celebrates general error handlers as well
    app.use(errors());
    app.use(errorHandler);
}