const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
    name: String,
    questions: Array,
    results: Array
}, {
    collection: 'Tests'
}, {
    versionKey: false
});

module.exports = mongoose.model('Test', testSchema);

// Студент отправляет запрос для получения тестов. Запрос смотрит по группам - в каких группах есть такой студент
// и собирает тесты которые есть в этих группах, и отпралвяет студенту

//В questions будет 3 объекта. {question: String, isAnswer: Boolean, time: Timestamp}
//В results {student: {name: String, id: ID}, success: Number, Error: Number}