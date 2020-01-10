const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var MemberSchema = new Schema({
    external_id: {
        unique: true,
        require: true,
        type: String
    },
    username: {
        unique: true,
        require: true,
        type: String
    }
});

var MemberMDB = mongoose.model('MemberMDB', MemberSchema);
module.exports = MemberMDB;
