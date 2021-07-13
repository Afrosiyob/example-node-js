const { FileModel } = require( "../models/file.model" );
const fs = require( "fs" );
const config = require( "config" );


const fileUpload = async ( req, res ) => {
    try {
        if ( !req.file ) {
            res.status( 400 ).json( {
                message: "please enter file",
            } );
        } else {
            const newFile = new FileModel( {
                src: req.file.filename,
            } );
            await newFile.save();
            res.status( 200 ).json( req.file );
        }
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json( { message: "server error" } );
    }
};

const fileDelete = async ( req, res ) => {
    try {
        const { filename } = req.body;
        fs.unlink( `./public/images/${ filename }`, ( error ) => {
            if ( error ) {
                console.log( error );
            } else {
                console.log( "deleted success" );
                res.status( 200 ).json( { message: "removed" } );
            }
        } );
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json( { message: "server error" } );
    }
};

module.exports = {
    fileUpload,
    fileDelete,
};
