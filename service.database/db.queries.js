/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { generateHashedPassword } = require('../service.strategy/strategy.passHashing/standardHash');
const User = require('./db.model');


// **** FINDER QUERIES **** //

function getUserByUsername ( username ) {
	return User.model.findOne({ username }).lean();
}

function getUserById( id ) {
	return User.model.findById( id ).lean()
}

function getUserandReturnByField( id , property ) {
	return User.model.findById( id ).select(`name ${ property }`).lean()
}


// **** MUTABLE AUTH ******* //

/**
 * @param { object { username , password , ...other properties } } userObject 
 * @uses generateHashedPassword( password )
 * @constraints object 
 * @description saves a new mongoose object to the database. password string in object is automatically converted to bcrypt string.
 * @returns saved user object.
 */

async function addNewUser({ userObject }) {
	try {
		userObject.password = await generateHashedPassword( userObject.password );
		let user = new User.model( userObject );
		user.save();
		return user;
	}
	catch ( err ) {
		throw 'could not create new user';
	}
}

/**
 * @param {string} username 
 * @description searches the database and determines whether a username has been taken by another user.
 * @returns an object containing the found user model and a boolean of whether the user is unique.
 */

async function newUserIsUnique( username ) {
	let user = await User.model.findOne({ username }).lean();
	return {
		user , isUnique: user == null
	}
}

// **** DEVELOPER QUIRES *** //

async function changeUserPassword({ id , newPassword }) {
	// let passwordHashed = await generateHashedPassword( newpPassword );
	return await mutateById({ id , obj: { password : newPassword } });
}


// **** MUTABLE QUERIES **** // 

function mutateById ({ id , obj }) {
	return User.model.findByIdAndUpdate( id , obj , { new: true } );
}

function updateField ({ findByUsername , USER_MODEL }) {
	return User.model.update( { findByUsername } , USER_MODEL );
}

// **** Developer Queries *** //

function removeAll ( ) {
	return User.model.deleteMany({});
}


// ******* exports ********* //

module.exports.developerQueries = {
	removeAll
}

module.exports.finderQueries = {
	getUserById , getUserByUsername , getUserandReturnByField
}

module.exports.mutableQueries = {
	updateField , mutateById
}

module.exports.mutableAuthQueries = {
	addNewUser , changeUserPassword , newUserIsUnique
}