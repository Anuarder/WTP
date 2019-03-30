const User = require("../models/User");
const Test = require("../models/Test");

module.exports = {
    async getActiveTests(req, res) {
        try {
            let student = await User.findOne({_id: req.userData.id});
            let activeTests = await Test.find({_id: {$in: student.tests}});

            res.send({
                tests: activeTests
            });
        } catch (err) {
            console.log("\x1b[31m", err);
            res.status(400).send({
                error: "Students test get error"
            });
        }
    },
    async getPassedTests(req, res) {
        try {
            let student = await User.findOne({_id: req.userData.id});
            res.send({
                tests: student.testResults
            });
        } catch (err) {
            console.log("\x1b[31m", err);
            res.status(400).send({
                error: "Students test get error"
            });
        }
    },
    async passTest(req, res){
        try{
            let student = await User.findOne({_id: req.userData.id});
            let test = await Test.findOne({_id: req.body.test});
            let passedTest = req.body.passedTest;

            //TODO: Проверить тест и записать результат

            res.send({
                message: "Тест отправлен"
            });
        }catch(err){
            console.log("\x1b[31m", err);
            res.status(400).send({
                error: "PassTest error"
            });
        }
    }
}