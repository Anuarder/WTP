const User = require('../models/User');
const Test = require('../models/Test');

module.exports = {
    async getStudents(req, res){
        try{
            // TODO: Получить студентов учителя
        }catch(err){
            console.log("\x1b[31m", err); 
            res.status(400).send({
                error: err
            });
        }
    },
    async createTest(req, res) {
        try {
            let test = await Test.findOne({ name: req.body.name });
            if (test) {
                throw "Тест уже создан";
            } else {
                let newTest = new Test({
                    name: req.body.name,
                    questions: req.body.questions,
                    time: req.body.time,
                    results: {
                        pass: 0,
                        flooded: 0
                    },
                });
                let saveTest = await newTest.save();
                await User.update(
                    { _id: req.userData.id },
                    { $addToSet: { tests: saveTest._id } }
                );
                //TODO: Проверка на отправку теста modify = 1
                res.send({
                    message: "Тест создан"
                });
            }
        } catch (err) {
            console.log("\x1b[31m", err); 
            res.status(400).send({
                error: err
            });
        }
    },
    async deleteTest(req, res) {
        try {
            // TODO: Удалить тест
        } catch (err) {
            console.log("\x1b[31m", err);
            res.status(400).send({
                error: err
            });
        }
    },
    async sendTestToStudents(req, res) {
        try {
            // TODO: Отправить тест студентам
        } catch (err) {
            res.status(400).send({
                error: err
            });
            console.log("\x1b[31m", err);
        }
    },
}