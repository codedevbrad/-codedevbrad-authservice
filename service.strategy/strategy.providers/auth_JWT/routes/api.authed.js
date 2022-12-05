/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');

const { authenticateTokenMiddleware }  = require('../auth/auth.token');
const { getUserUsingTokenCredentials } = require('../auth/auth.authenticate');


// / authservice / noauth

api.use( authenticateTokenMiddleware );

api.get('/' , ( req , res ) => res.status(200).send('authed v0'));

api.get('/getuser' , asyncSupport( async ( req , res , next ) => {
        // token credentials.
        let { _id } = req.token;
        // get user from database using token creds.
        let user = await getUserUsingTokenCredentials( _id );
        res.status( 200 ).send( user );
}));

// update last logged.


module.exports = api;