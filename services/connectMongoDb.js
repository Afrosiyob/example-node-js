const mongoose = require( "mongoose" )
const config = require( "config" )

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

module.exports = {
    connectMongoDB
}