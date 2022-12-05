/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// GET DB QUERIES FROM DB.QUERIES.JS
const db_test_api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');

const { removeAll } = require('../db.queries').developerQueries;

// / auth / test / authservice / db / queries / developer

db_test_api.get('/' , ( req , res ) => res.status( 200 ).send('/ auth / test / authservice / db / queries / developer /'))

db_test_api.get('/removeall' , asyncSupport( async ( req, res ) => {
    await removeAll();
    res.status( 200 ).send( 'removed all' );
}));


module.exports = db_test_api;