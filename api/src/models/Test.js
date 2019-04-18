const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema(
    {
        name: String,
        questions: Array,
        results: {
            type: Map,
            of: Number
        },
        time: Number,
        date: String,
        students: [String]
    },
    {
        collection: "Tests"
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model("Test", testSchema);