
const passport = require('passport');

const authenticate = ( req , res , next ) => new Promise( ( resolve , reject ) => {
    passport.authenticate( 'local', ( err , user , info ) => {
           if ( err ) {
               reject('error trying to login');
           }
           resolve( user );
    }) ( req , res , next );
});

const loginUser = ( req , user ) => new Promise( ( resolve , reject ) => {
      req.logIn( user,  ( err ) => {
          if (err) {
             reject(err )
          }
          resolve( user );
      });
});

module.exports = {
    authenticate , loginUser
};
