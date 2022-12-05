/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
// GET DB QUERIES FROM DB.QUERIES.JS

const db_test_api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');

const { updateField } = require('../db.queries').mutableQueries;

// / auth / test / authservice / db / queries / mutable /

db_test_api.post('/updatefield' , asyncSupport( async ( req, res, next ) => {
    const { username } = req.body;

    const userUpdated = await updateField({ findByUsername: username , USER_MODEL: {
        username: 'udatedusername2'
    }}); 
    
    res.status(201).json({
        route: '/ auth / test / authservice / db / queries / mutable / updatefield' , 
         data: userUpdated
    });
}));



module.exports = db_test_api;