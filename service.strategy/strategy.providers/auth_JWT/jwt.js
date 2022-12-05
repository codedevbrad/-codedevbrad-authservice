
class JWT {
    constructor ( ) {
        this.secret = 'noy set yet';
    }

    tellJwtSecret ( ) {
        return this.secret;
    }

    setJwtSecret ( secret ) {
        this.secret = secret;
    }
}

let JwtInstance = new JWT();

module.exports = JwtInstance;
