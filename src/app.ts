import express from 'express';
import initiateLoaders from './loaders/index.js';
import Logger from './loaders/logger.js';

async function startServer() {
    
    const app = express();

    /**
     * Attempt to run our loaders
     */
    try {
        initiateLoaders(app);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    /**
     * Launch our server on the port described in .env
     */
    app.listen(process.env.PORT, () => {
        Logger.info('Starting server - listening on port 3000')
    });

}

startServer();