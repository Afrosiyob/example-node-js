const express = require( "express" );
const config = require( "config" );
const morgan = require( "morgan" );
const { connectMongoDB } = require( "../services/connectMongoDb" );
const { userRouter } = require( "../src/routes/user.routes" );
const { authRouter } = require( "../src/routes/auth.routes" );
const serveIndex = require( "serve-index" );
const { bookRouter } = require( "../src/routes/book.routes" );
const { fileRouter } = require( "../src/routes/file.routes" );

// Create App server
const app = express();

// Access json
app.use( express.json( { extended: true } ) );
app.use( express.urlencoded( { extended: false } ) );

// Show Requests to console
if ( app.get( "env" ) === "development" ) {
    app.use( morgan( "tiny" ) );
}

// Static files
app.use(
    "/public",
    express.static( "public" ),
    serveIndex( "public", { icons: true } )
);

// Routes
app.use( "/api/user", userRouter );
app.use( "/api/auth", authRouter );
app.use( "/api/book", bookRouter );
app.use( "/api/file", fileRouter );


// Create PORT
const PORT = config.get( "PORT" ) || process.env.PORT || 5000;

// Start App server
app.listen( PORT, connectMongoDB );