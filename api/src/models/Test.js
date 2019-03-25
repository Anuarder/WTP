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
        time: Number
    },
    {
        collection: "Tests"
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model("Test", testSchema);

// Студент отправляет запрос для получения тестов. Запрос смотрит по группам - в каких группах есть такой студент
// и собирает тесты которые есть в этих группах, и отправляет студенту

//В questions будет 3 объекта. {question: Array, answer: Number, time: Timestamp}
//В results {student: {name: String, id: ID}, success: Number, Error: Number}2
