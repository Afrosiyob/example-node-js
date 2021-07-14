const express = require("express");
const config = require("config");
const morgan = require("morgan");
const serveIndex = require("serve-index");
const { handleErrors } = require("../src/errors/errors");
const { connectMongoDB } = require("../services/connectMongoDb");

// Import Routes
const { userRouter } = require("../src/routes/user.routes");
const { authRouter } = require("../src/routes/auth.routes");
const { bookRouter } = require("../src/routes/book.routes");
const { fileRouter } = require("../src/routes/file.routes");

require("express-async-errors");
// Create App server
const app = express();

// Access json
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));

// Show Requests to console
if (app.get("env") === "development") {
    app.use(morgan("tiny"));
}

// Static files
app.use(
    "/public",
    express.static("public"),
    serveIndex("public", { icons: true })
);

// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/book", bookRouter);
app.use("/api/file", fileRouter);

// Handle promise and server error (please put this code after last middleware)
app.use(handleErrors);

// Create PORT
const PORT = config.get("PORT") || process.env.PORT || 5000;

// Start App server
app.listen(PORT, connectMongoDB);