class HttpError extends Error {
    constructor(message, errorCode) {
        super(message); // ajoute propriété message
        this.code = errorCode // ajoute propriété code
    }
}
module.exports = HttpError;