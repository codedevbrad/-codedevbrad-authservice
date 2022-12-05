/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */ 
const api = require('express').Router();

const API_DBModel   = require('./service.database/db.model');
const API_DBQueries = require('./service.database/db.queries');

const API_DBTests__finders = require('./service.database/db.tests/test.db.finders' );
const API_DBTests__mutable_Plain = require('./service.database/db.tests/test.db.mutable' );
const API_DBTests__mutable_Auth = require('./service.database/db.tests/test.db.mutableAuth' );
const API_DBTests__developer = require('./service.database/db.tests.developer/test.db.developer');

const TEST_Standard_Userhash = require('./service.strategy/strategy.passHashing/standardHash/tests/test.index');

const Email = require('./service.services/services.email/class');
const API_Services__email = require('./service.services/services.email/tests/test.email');

const { authenticateToken , authenticateTokenMiddleware } = require('./service.strategy/strategy.providers/auth_JWT/auth/auth.token');
const API_authed   = require('./service.strategy/strategy.providers/auth_JWT/routes/api.authed');
const API_noAuthed = require('./service.strategy/strategy.providers/auth_JWT/routes/api.noAuth');

const API_JWT_tests = require('./service.strategy/strategy.providers/auth_JWT/routes/api.test');

const JWT = require('./service.strategy/strategy.providers/auth_JWT/jwt');


///////////////  TESTS  ////////////////

// standard bcrypt encryption. 
api.use('/test/authservice/passhash/bcrypt' , TEST_Standard_Userhash );

// add database test route.
api.use('/test/authservice/db/queries/finders'     , API_DBTests__finders );
api.use('/test/authservice/db/queries/mutableauth' , API_DBTests__mutable_Auth );
api.use('/test/authservice/db/queries/mutable'     , API_DBTests__mutable_Plain );
api.use('/test/authservice/db/queries/developer'   , API_DBTests__developer );

api.use('/test/authservice/services/email' , API_Services__email );


// ----------- strategy ------------- //

// [ chosen endpoint ] / 
api.get('/' , ( req , res ) => res.send('/ authService') );


class AuthenticationService {
    constructor (  ) {
        // global
        this.authProvider = null;
        this.path = '/auth';
        this.app = null;
    }

    returnJWTInit ( ) {
        return this.jwtSecret;
    }

    initialiseAuthService ({ register , authProvider , path = '/auth' , app , extendModel = { } }) {
        this.path = path;
        this.authProvider = authProvider;
        this.app = app;

        const registerType = register.type;
        const registerEmail = register.emailSender;
        
        API_DBModel.setModel( extendModel );
        Email.setEmail( registerEmail );

        switch ( authProvider ) {
            case 'jwt':
                // main routes ...
                api.use('/authservice/noauth'   , API_noAuthed );
                api.use('/authservice/authed'   , API_authed );
                api.use('/test/jwt/authservice' , API_JWT_tests );
                break;
    
            case 'passport':
                api.get('/authservice/passport' , ( req , res ) => res.send('/ passport / ' ) );
                break;
    
            default:
                break;
        }
        console.log('auth routes all set so thats cool');
    
        app.use( path , api ); 
    }

    initialiseJWTProvider ({ secret = '12345' } ) {
        JWT.setJwtSecret( secret );
    }
}

const authSingleton = new AuthenticationService();


// ****** JWT AUTH STRATEGY ******* //

module.exports.JWTMiddleware = {
    authenticateToken , authenticateTokenMiddleware
}
// // ********* USER DATABASE ******** //

module.exports.AuthUser = API_DBModel;
module.exports.AuthUserQueries = API_DBQueries;


module.exports.AuthService = authSingleton;
