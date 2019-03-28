const User = require('../models/User');
const Test = require('../models/Test');

module.exports = {
    async getAllStudents(req, res){
        try{
            let students = await User.find({role: 'student'});
            let filterStudents = [];
            for(let el of students){
                filterStudents.push({
                    name: el.name,
                    email: el.email,
                    testResults: el.testResults,
                    id: el._id
                });
            }
            res.send({
                students: filterStudents
            });
        }catch(err){
            console.log("\x1b[31m", err);
            res.status(400).send({
                error: "Students test get error"
            });
        }
    },
    async getTeacherStudents(req, res){
        try{
            let teacher = await User.findOne({_id: req.userData.id});
            let students = [];
            for(let student of teacher.students){
                let val = await User.findOne({_id: student});
                students.push({
                    name: val.name,
                    email: val.email,
                    testResults: val.testResults,
                    id: val._id
                });
            }
            res.send({
                students: students
            });
        }catch(err){
            console.log("\x1b[31m", err); 
            res.status(400).send({
                error: err
            });
        }
    },
    async addStudents(req, res){
        try{
            for(let student of req.body.students){
                await User.updateOne({_id: req.userData.id}, {$addToSet: {students: student}});
            }
            res.send({
                message: 'students added'
            })
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
                await User.updateOne(
                    { _id: req.userData.id },
                    { $addToSet: { tests: saveTest._id } }
                );
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
            let test = await Test.findOne({_id: req.body.test});
            await User.updateMany({_id: {$in: test.students}}, {$pull: {tests: req.body.test}});
            await User.updateOne({_id: req.userData.id}, {$pull: {tests: req.body.test}});
            await Test.deleteOne({_id: req.body.test});
            res.send({
                message: "Test deleted"
            });
        } catch (err) {
            console.log("\x1b[31m", err);
            res.status(400).send({
                error: err
            });
        }
    },
    async deleteTeacherStudents(req, res){
        try{
            await User.updateOne({_id: req.userData.id}, {$pull: {students: {$in: req.body.students}}});
            res.send({
                message: "Students deleted"
            });
        }catch(err){
            console.log("\x1b[31m", err);
            res.status(400).send({
                error: err
            });
        }
    },
    async getTeacherTests(req, res){
        try{
            let teacher = await User.findOne({_id: req.userData.id});
            let tests = await Test.find({_id: {$in: teacher.tests}});
            res.send({
                tests: tests
            });
        }catch(err){
            console.log("\x1b[31m", err);
            res.status(400).send({
                error: err
            });
        }
    },
    async sendTestToStudents(req, res) {
        try {
            for(let test of req.body.tests){
                await User.updateMany({_id: {$in: req.body.students}}, {$addToSet: {tests: test}});
            }
            for(let student of req.body.students){
                await Test.updateMany({_id: {$in: req.body.tests}}, {$addToSet: {students: student}});
            }
            res.send({
                message: "Update student test"
            });
        } catch (err) {
            res.status(400).send({
                error: err
            });
            console.log("\x1b[31m", err);
        }
    },
}