
const bcrypt = require('bcrypt');

const generateHashedPassword = ( passwordString ) => new Promise( ( resolve , reject ) => {
      bcrypt.genSalt( 10 , ( err , salt ) => {
             bcrypt.hash( passwordString , salt, ( err, hash ) => {
                 if( err ) {
                    reject( err );
                 }
                 resolve( hash );
             });
      });
});

module.exports = generateHashedPassword;
