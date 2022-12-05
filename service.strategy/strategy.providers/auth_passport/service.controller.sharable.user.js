/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const Users = require('./service.model');

module.exports.user_get = ( req , res , next ) => {
  Users.findById( { _id: req.user._id } )
       .select('-password')
       .then( user => {
         if ( !user ) { return res.status(500).send({ msg: 'no user found' }) }
         res.status( 200 ).json( user );
       })
       .catch( next );
}
