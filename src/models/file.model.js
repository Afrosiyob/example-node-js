const { Schema, model, Types } = require( "mongoose" );
const config = require( "config" );

const { ObjectId } = Types;

const schema = new Schema( {
    src: {
        type: String,
        default: `${ config.get( "baseUrl" ) }/public/images/default_user_image.jpg`,
    },
    owner: {
        type: ObjectId,
        ref: "User",
    },
} );

module.exports = {
    FileModel: model( "File", schema ),
};
