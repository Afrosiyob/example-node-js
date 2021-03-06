const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    username: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
    },
    password: {
        type: String,
        required: true,
    },
    books: {
        type: Types.ObjectId,
        ref: "Book",
    },
});

module.exports = {
    UserModel: model("User", schema),
};