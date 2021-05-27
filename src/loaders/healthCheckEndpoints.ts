import express from 'express';

export default function healthCheckEnpointLoader(app: express.Application) {

    const healthCheckRoute = express.Router();

    healthCheckRoute.get('/', (req: express.Request, res: express.Response) => {
        res.status(200).send('OK');
    })

    app.use(`${process.env.API_PREFIX}${process.env.HEALTH_CHECK_ROUTE}`, healthCheckRoute);
}