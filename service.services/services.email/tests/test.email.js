/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const express = require('express');
const { asyncSupport } = require('@codedevbrad/serverutils');
const { sendEmail } = require('../index');

const test_api = express.Router();

// / test / authservice / services / email 

test_api.get('/' , ( req , res ) => {
    res.status( 200 ).send('/ test / authservice/ services / email ');
});

test_api.get('/sendemail' , asyncSupport( async ( req , res ) => {
    const sendMail = await sendEmail({
        sendTo: 'brad12468@gmail.com' , 
        subject: 'confirm your new account',
        html: `
            welcome user123. 
            click _____ to confirm your new account creation.
        ` 
    });
    res.status( 200 ).send( sendMail );
}));

module.exports = test_api;