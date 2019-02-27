const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema(
    {
        name: String,
        students: Array,
        courses: Array
    },
    {
        collection: 'Groups'
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Group', groupSchema);