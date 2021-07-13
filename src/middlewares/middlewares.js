const { validationResult } = require( "express-validator" );
const { UserModel } = require( "../models/user.model" );
const config = require( "config" )
const jwt = require( "jsonwebtoken" );
const multer = require( "multer" );


// Get and send errors
const validationError = async ( req, res, next ) => {
    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        res.status( 400 ).json( {
            errors: errors.array(),
            message: "please check failds"
        } )
    } else {
        await next()
    }
}

// Check permissions
const setPermissions = ( permissions ) => async ( req, res, next ) => {
    const { userId } = req.user
    const { role } = await UserModel.findById( userId )
    if ( permissions.includes( role ) ) {
        await next()
    } else {
        return res
            .status( 401 )
            .json( { message: " u dont have a permission this route " } )
    }
}

// Check auth and token
const checkAuth = async ( req, res, next ) => {
    if ( req.method === "OPTIONS" ) {
        await next();
    } else {
        try {
            let token;
            if (
                req.headers.authorization &&
                req.headers.authorization.startsWith( "Bearer" )
            ) {
                token = req.headers.authorization.split( " " )[ 1 ]; // "Bearer TOKEN"
            }
            if ( !token ) {
                await res.status( 401 ).json( { message: "auth error try middleware" } );
            } else {
                let decoded = jwt.verify( token, config.get( "jwtSecret" ) );
                req.user = decoded;
                res.setHeader( "Last-Modified", new Date().toUTCString() );
                await next();
            }
        } catch ( error ) {
            console.log( error );
            return await res.status( 401 ).json( { message: "auth error catch middleware", error } );
        }
    }
};


// Set
const storage = multer.diskStorage( {
    destination: ( req, file, cb ) => {
        cb( null, `./public/images` );
    },
    filename: ( req, file, cb ) => {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname( file.originalname )
        );
    },
} );

//Init Upload
const upload = multer( {
    storage: storage,
} ).single( "image" );


module.exports = {
    validationError,
    setPermissions,
    checkAuth,
    upload
}