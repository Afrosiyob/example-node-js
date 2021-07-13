const mongoose = require( "mongoose" )
const config = require( "config" )

// Simple connection
const connectMongoDB = async () =>
    await mongoose
        .connect( config.get( "mongoUrl" ), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        } )
        .then( () => console.log( "MongoDB connected" ) )
        .catch( ( error ) => {
            console.log( error );
            process.exit( 1 )
        } )

// Connection for file
const connectMongoDBFile = mongoose
    .createConnection( config.get( "mongoFileUrl" ), {
        useNewUrlParser: true,
        useUnifiedTopology: true,

        useCreateIndex: true,
        useFindAndModify: false,
    } )



module.exports = {
    connectMongoDB,
    connectMongoDBFile
}