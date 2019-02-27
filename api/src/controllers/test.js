const User = require('../models/User');
const Group = require('../models/Group');
const Test = require('../models/Test');

module.exports = {
    async createTest(req, res) {
        try {
            res.send({
                message: "Тест создан"
            })
        } catch (err) {
            res.send({
                error: err
            });
        }
    },
    async deleteTest(req, res) {
        try {
            res.send({
                message: 'Группа удаленна'
            })
        } catch (err) {
            res.send({
                error: err
            });
        }
    }
}