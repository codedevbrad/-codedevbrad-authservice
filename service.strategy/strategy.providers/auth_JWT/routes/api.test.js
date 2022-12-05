const api_test = require('express').Router();

// / {{endpoint}} / test / jwt / authservice /

api_test.get('/' , ( req , res ) => res.status(200).send(' / {{endpoint}} / test / jwt / authservice /'));

// AUTH STRATEGY TESTS
api_test.use('/strategy/token' , require('../auth/tests/test.token') );
api_test.use('/strategy/auth'  , require('../auth/tests/test.authenticate') );

module.exports = api_test;