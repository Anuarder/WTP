const User = require("../models/User");
const Group = require("../models/Group");
const Test = require("../models/Test");

module.exports = {
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
                    groups: []
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
            res.send({
                error: err
            });
            console.log("\x1b[31m", err); //"\x1b[31m", для окрашивания текста в красный 
        }
    },
    async deleteTest(req, res) {
        try {
            //TODO: Нужно чтоб у ученика тоже удалялся, или хранился отдельно с результатами и тд
            //TODO: Не удаляется из группы
            let test = await Test.findOne({ _id: req.body.id });
            await Test.remove({ _id: req.body.id });
            await User.updateOne(
                { _id: req.userData.id },
                { $pull: { tests: req.body.id } }
            );
            await Group.updateMany(
                { _id: { $in: test.groups } },
                { $pull: { tests: req.body.id } }
            );

            test.remove({ _id: req.body.id });
            res.send({
                message: "Тест удален"
            });
        } catch (err) {
            res.send({
                error: err
            });
            console.log("\x1b[31m", err);
        }
    },
    async getTests(req, res) {
        try {
            let teacher = await User.findOne({ _id: req.userData.id });

            let tests = await Test.find({ _id: { $in: teacher.tests } });

            res.send({
                tests: tests
            });
        } catch (err) {
            res.send({
                error: err
            });
            console.log("\x1b[31m", err);
        }
    },
    async sendTest(req, res) {
        //TODO: Проблема с отправкой тестов. Группа не обновляется
        try {
            let test = await Test.updateOne(
                { _id: req.body.id },
                { $addToSet: { groups: req.body.groups } }
            );
            let group = await Group.updateMany(
                { _id: { $in: req.body.groups } },
                { $addToSet: { tests: req.body.id } }
            );
            console.log(test);
            console.log(group);
            if(test.nModified >= 1 && group.nModified >= 1){
                res.send({
                    success: true,
                    message: "Тест отправлен"
                });
            }else{
                res.send({
                    success: false,
                    message: "Тест не отправлен"
                });
            }
            
        } catch (err) {
            res.send({
                error: err
            });
            console.log("\x1b[31m", err);
        }
    },
    async getStudentTests(req, res) {
        try {
            // TODO: Получение пройденных, но удаленных для студента тестов
            let student = await User.findOne({ _id: req.userData.id });
            let groups = await Group.aggregate([
                { $match: { "students.id": req.userData.id } }
            ]);
            let stundentTestsID = [];
            for (group of groups) {
                for (test of group.tests) {
                    stundentTestsID.push(test);
                }
            }
            let tests = await Test.find({ _id: { $in: stundentTestsID } });
            let filterTests = [];
            for (test of tests) {
                if (student.tests.length !== 0) {
                    for (pass of student.tests) {
                        if (test._id == pass) {
                            filterTests.push({
                                test: test,
                                isPassed: true
                            });
                        } else {
                            filterTests.push({
                                test: test,
                                isPassed: false
                            });
                        }
                    }
                } else {
                    filterTests.push({
                        test: test,
                        isPassed: false
                    });
                }
            }

            res.send({
                tests: filterTests
            });
        } catch (err) {
            res.status(400).send({
                error: "Students test get error"
            });
            console.log(err);
        }
    }
};
