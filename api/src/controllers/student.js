const User = require("../models/User");
const Test = require("../models/Test");

module.exports = {
    async getActiveTests(req, res) {
        try {
            // TODO: Получить активные тетсы
        } catch (err) {
            console.log("\x1b[31m", err);
            res.status(400).send({
                error: "Students test get error"
            });
        }
    },
    async getPassedTests(req, res) {
        try {
            // TODO: Получить пройденные тетсы
        } catch (err) {
            console.log("\x1b[31m", err);
            res.status(400).send({
                error: "Students test get error"
            });
        }
    },
    async passTest(req, res){
        try{
            // TODO: Сдать тест
        }catch(err){
            console.log("\x1b[31m", err);
            res.status(400).send({
                error: "PassTest error"
            });
        }
    }
}