
const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcrypt');
const Users         = require('../service.model');

module.exports = function( passport ) {

        // local Strategy
        passport.use( new LocalStrategy( ( username , password , done ) => {

                var query = { username };

                Users.findOne( query, ( err , user ) => {

                        if(   err ) { throw err  }
                        if( !user ) { return done(null, false );  }

                        // match password
                        bcrypt.compare( password, user.password , ( err , isMatch ) => {

                              if( err)    { throw err;   }
                              if(isMatch) { return done(null, user);   }
                              else        { return done(null, false ); }
                        });
                });
        }));

        passport.serializeUser( ( user , done ) => {
            done( null , user.id );
        });

        passport.deserializeUser( ( id , done ) => {
            Users.findById( id , ( err , user ) => {
              done( err , user );
            });
        });
};
