/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
// GET DB QUERIES FROM DB.QUERIES.JS
const db_test_api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');

const { addNewUser , newUserIsUnique , changeUserPassword } = require('../db.queries').mutableAuthQueries;

// / auth / test / authservice / db / queries / mutableAuth

db_test_api.post('/saveuser' , asyncSupport( async ( req, res, next ) => {
    const { user } = req.body;
    const userSaved = await addNewUser({ userObject : user }); 
    res.status(201).json({
        route: '/ auth / test / authservice / db / queries / mutableAuth / saveuser' , 
         data: userSaved
    });
}));


db_test_api.get('/isunique' , asyncSupport( async ( req, res, next ) => {
    const { username } = req.body;
    const usernameIsUnique = await newUserIsUnique( username ); 
    res.status(201).json({
        route: '/ auth / test / authservice / db / queries / mutableAuth / isunique' , 
         isUnique: usernameIsUnique
    });
}));


db_test_api.put('/changepassword' , asyncSupport( async ( req, res, next ) => {
    const { id , newPassword } = req.body;
    // generate new password.
    const userUpdated = await changeUserPassword({ id: id , newPassword: newPassword }); 
    res.status(201).json({
        route: '/ auth / test / authservice / db / queries / mutableAuth / changepassword' , 
        updated: userUpdated
    });
}));



module.exports = db_test_api;