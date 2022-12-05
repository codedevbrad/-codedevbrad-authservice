/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */ 
try {
  var mongoose = require('mongoose');
} catch (_) {
  // workaround when `npm link`'ed for development
  var prequire = require('parent-require')
    , mongoose = prequire('mongoose');
}

class MongodbModel {
    constructor ( ) {
        this.model = {};
    }

    setModel ( obj ) {
        this.model = mongoose.model( 'users' , new mongoose.Schema ({
          ...obj , 
          username:     { type: String , required: true } ,
          password:     { type: String , required: true} , 
          last_logged:  { type: Date   } ,
        }))
    }
}

let mongooseModel = new MongodbModel();

module.exports = mongooseModel; 