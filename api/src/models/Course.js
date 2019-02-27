const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema(
    {
        name: String,
        department: Object,
        teacher: Object
    },
    {
        collection: 'Courses'
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Group', courseSchema);