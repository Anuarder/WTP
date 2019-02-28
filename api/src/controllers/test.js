const User = require("../models/User");
const Group = require("../models/Group");
const Test = require("../models/Test");

module.exports = {
    async createTest(req, res) {
        try {
            let test = await Test.find({ name: req.body.name });
            if (test) {
                res.send({
                    error: "Тест уже создан"
                });
            } else {
                let newTest = new Test({
                    name: req.body.name,
                    questions: req.body.questions,
                    time: req.body.time,
                    result: [],
                    groups: []
                });

                if (req.body.groups.lenght !== 0) {
                    newTest.groups = req.body.groups;
                }

                let saveTest = await newTest.save();

                if (newTest.groups !== 0) {
                    await Group.update(
                        { _id: { $in: newTest.groups } },
                        { $addToSet: { tests: saveTest._id } }
                    );
                }
                res.send({
                    message: "Тест создан"
                });
            }
        } catch (err) {
            res.send({
                error: err
            });
        }
    },
    async deleteTest(req, res) {
        try {
            res.send({
                message: "Группа удаленна"
            });
        } catch (err) {
            res.send({
                error: err
            });
        }
    }
};
