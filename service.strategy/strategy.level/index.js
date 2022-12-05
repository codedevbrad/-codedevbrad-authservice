/* eslint-disable no-undef */

class AuthRegisterLevel {
    constructor (  ) {
        this.authLevel = 'basic';
    }

    setAuthLevel ( level ) {
        this.authLevel = level;
    }
}

const AuthLevel = new AuthRegisterLevel();

module.exports = AuthLevel;