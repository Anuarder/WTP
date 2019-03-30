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
            
            for(let question of test.questions){
                console.log(question);
                let answerCount = 0;
                for(let answer of question.answers){
                    if(answer.isAnswer){
                        answerCount++;
                    }
                }
                // Процент одного выбранного ответа в вопросе
                let answerScrore = questionScrore / answerCount;
                console.log(answerScrore)
            }

            for(let i = 0; i < test.questions.length; i++){
                let answerCount = 0;
                for(let j = 0; j < test.questions[i].answers; j++){
                    let isSelected = passedTest[i].answers[j].isSelected;
                    let isAnswer = test.questions[i].answers[j].isAnswer;

                    //TODO: Проверить тест и записать результат
                }
            }

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