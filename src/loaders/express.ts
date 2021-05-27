import express from 'express';
import cors from 'cors';
import routes from '../api/index.js';

export default async function expressLoader(app: express.Application) {

    /** 
     * First let's load in any packages/general functionality we need for our server
    */

    //new version of body parser to read JSON body components
    app.use(express.json());

    //enabling cors
    app.use(cors());


    /**
     * 
     * Now let's load in our API routes
     * 
     * We're using the API_PREFIX environment variable in part to be 'future-proofed' - should we release a new version of the API (v1 to v2) or switch branches (prod, test, dev, etc), or any reason we need to change the route prefixes, this will streamline it
     * 
     * ex: if we decide to go from example.com/api/v1/[routes] -> example.com/api/v2/[routes]
     * OR ex: example.com/api/test/v1 -> example.com/api/prod/v1
    */
    app.use(process.env.API_PREFIX, routes())

}