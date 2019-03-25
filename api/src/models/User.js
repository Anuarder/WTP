const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: String,
        role: String,
        email: String,
        password: String,
        tests: [Object],
        testResuls: [Object],
        students: [String]
    },
    {
        collection: 'Users'
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('User', userSchema);