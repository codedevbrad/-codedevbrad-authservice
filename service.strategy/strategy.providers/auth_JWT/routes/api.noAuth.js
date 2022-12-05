/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const api = require('express').Router();
const { asyncSupport } = require('@codedevbrad/serverutils');

const { login } = require('../auth/auth.authenticate');
const { getUserByUsername } = require('../../../../service.database/db.queries').finderQueries;
const { addNewUser , newUserIsUnique } = require('../../../../service.database/db.queries').mutableAuthQueries;


// / authservice / noauth.

api.get('/' , ( req , res ) => res.status(200).send('/ authservice / noauth /'));


api.get('/checkusername' , asyncSupport( async ( req , res , next ) => {
    let { username } = req.query;

    if ( !username ) throw { status: 400, message: 'detailed message' };

    // check username.
    let userNameExists = await getUserByUsername( username );

    let exists = userNameExists ? true : false;

    res.status( 200 ).send( exists );
}));


api.post('/login' , asyncSupport( async ( req , res , next ) => {
    let { username , password } = req.body;

    if ( !username || !password ) throw { status: 400, message: 'missing username or password'};

    // login
    let userlogin = await login({ username , password });
    res.status( 200 ).send( userlogin );
}));


api.post('/register' , asyncSupport( async ( req , res , next ) => {
    let { username , password , ...extraRegisterFields } = req.body;

    // check  username | password isn't empty.
    if ( !username || !password ) throw { status: 400, message: 'missing username or password'};

    // check username is unique.
    const { isUnique } = await newUserIsUnique( username );
    if ( !isUnique ) throw { status: 400, message: 'username already exists' };

    // save this user.
    await addNewUser({ userObject: { username , password , extraRegisterFields }});

    setTimeout( async ( ) => {  
        // login.
        let userlogin = await login({ username , password });
        res.status( 200 ).send( userlogin );
    }, 1500 );
}));

module.exports = api;