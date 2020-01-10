const mongoose = require('mongoose');
const config = require("../config");

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.connect(config.MONGODB_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
module.exports = mongoose;
