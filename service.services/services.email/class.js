/* eslint-disable no-undef */
class Email {
    constructor ( ) {
        this.email = null;
    }

    setEmail ( email ) {
        this.email = email;
    }

    getEmail ( ) {
        return this.email;
    }
}

const email = new Email();

module.exports = email;