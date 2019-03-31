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
            
            let date = new Date(); //Дата для записи рещультата
            
            const maxPercent = 100;
            let questionScrore = maxPercent / test.questions.length;

            let isAnswerCount = 0;
            let correctAnswer = 0;
            for(let i = 0; i < test.questions.length; i++){
                let answerCount = 0;
                for(let j = 0; j < test.questions[i].answers.length; j++){
                    let isSelected = passedTest[i].answers[j].isSelected;
                    let isAnswer = test.questions[i].answers[j].isAnswer;
                    
                    if(isAnswer){
                        isAnswerCount++;
                    }
                    if(isSelected && isAnswer){
                        answerCount++;
                    }
                }
                correctAnswer += answerCount;
            }
            if(correctAnswer < 0){
                correctAnswer = 0;
            }
            console.log(`Процентов ${Math.round((100 / isAnswerCount) * correctAnswer)}`);
            //TODO: Записать все в бд (Ответ готов)
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