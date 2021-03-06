const { logger } = require( "../logger/logger" );

const handleErrors = async ( err, req, res, next ) => {
    const { message } = err;
    switch ( message ) {
        case "NO_ROLE":
            logger.error( "same username" );
            return await res.status( 403 ).json( { error: message } );
        case "NO_PERMESSION":
            return await res.status( 403 ).json( { error: message } );
        case "PASSWORD_INCORRECT":
            return await res
                .status( 400 )
                .json( { error: message, message: "password incorrect" } );
        case "NO_USER":
            logger.error( "same username" );
            res.status( 400 ).json( { error: message, message: "no user" } );
        case "SAME_NAME":
            return await res
                .status( 400 )
                .json( { error: message, message: `please enter other name` } );
        case "NO_FILE":
            return await res.status( 400 ).json( {
                error: message,
                message: "please enter file",
            } );
        case "SAME_USERNAME":
            logger.error( "same username" );
            return await res
                .status( 400 )
                .json( { error: message, message: "enter other username" } );
        default:

            return await res.status( 500 ).json( { message: "server error new" } );
    }
};

module.exports = {
    handleErrors,
};