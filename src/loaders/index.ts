import { Application } from 'express'
import mongooseLoader from './mongoose.js';
import healthCheckEnpointLoader from './healthCheckEndpoints.js';
import expressLoader from './express.js';
import subscriberLoader from './subscribers.js';
import errorHandlerLoader from './errorHandlers.js';
import Logger from './logger.js';

export default async function initiateLoaders(app: Application) {
    /**
     * First let's initiate an load in our mongoose connection
    */    
    let mongooseConnection = await mongooseLoader();
    Logger.info('Mongoose connection established and loaded')

    /**
     * Let's attempt to load our health check endpoings
     */
    healthCheckEnpointLoader(app);
    Logger.info('Health check endpionts established successfull')
    
   /**
    * Now attempt to load in our subscribers
    */
   subscriberLoader();
   Logger.info('Subscribers successfully loaded')

   /**
    * Attempt to initiate our routes now
    */
   await expressLoader(app);
   Logger.info('Routes and express config loaded')

   /**
    * Finally, let's implement our generic error handler
    */
   await errorHandlerLoader(app);
   Logger.info('Error handlers loaded')
}