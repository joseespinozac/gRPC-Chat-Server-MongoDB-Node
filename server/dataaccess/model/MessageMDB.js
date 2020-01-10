const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var MessageSchema = new Schema({
    external_id: {
        require: true,
        type: String
    },
    message: {
        require: true,
        type: String
    },
    send: {
        require: true,
        type: Boolean
    },
    member: {type: Schema.Types.ObjectId, ref: 'MemberMDB'},
    chatgroup: {type: Schema.Types.ObjectId, ref: 'ChatGroupMDB'}

});

var MessageMDB = mongoose.model('MessageMDB', MessageSchema);
module.exports = MessageMDB;