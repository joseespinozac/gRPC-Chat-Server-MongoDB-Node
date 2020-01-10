const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var ChatGroupSchema = new Schema({
    external_id: {
        unique:true,
        require: true,
        type: String
    },
    members:[{type: Schema.Types.ObjectId, ref: 'MemberMDB'}]
});

var ChatGroupMDB = mongoose.model('ChatGroupMDB', ChatGroupSchema);
module.exports = ChatGroupMDB;