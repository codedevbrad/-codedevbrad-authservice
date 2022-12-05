
const Users = require('./service.model');

function getloggedUserFromDB ( )  {
    return Users.findById( { _id: req.user._id } )
                .select('-password');
}

function getUserFromDB ( username ) {
  return Users.findOne( { username } )
              .select('-password');
}

function createNewUser ( userObject ) {
    let user = new Users( userObject );
    return user.save()
}


module.exports = {
    getloggedUserFromDB , getUserFromDB , createNewUser
}
