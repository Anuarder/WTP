const User = require('../models/User');
const Group = require('../models/Group');

module.exports = {
    async createGroup(req, res) {
        try {
            let group = await Group.findOne({
                name: req.body.name
            });
            if (group) {
                throw "Группа уже созданна"
            } else {
                let newGroup = new Group({
                    name: req.body.name,
                    students: req.body.students,
                    tests: []
                });

                let saveGroup = await newGroup.save();
                
                await User.update({_id: req.userData.id}, {$addToSet: {groups: saveGroup._id}});

                res.send({
                    message: "Register new Group",
                });
            }
        } catch (err) {
            res.send({
                error: err
            });
        }
    },
    async deleteGroup(req, res) {
        try {
            await Group.remove({_id: req.body.id});
            await User.updateOne({ _id: req.userData.id }, {$pull: { groups: req.body.id }});
            res.send({
                message: "Группа удаленна"
            })
        } catch (err) {
            res.send({
                error: err
            });
            console.log(err);
        }
    },
    async getStudents(req, res) {
        try {
            let students = await User.find({
                role: 'student'
            });
            if (students) {
                let filterStudents = [];
                for (student of students) {
                    filterStudents.push({
                        name: student.name,
                        id: student.id,
                        email: student.email,
                        tests: student.tests,
                        groups: student.groups
                    });
                }
                res.send({
                    students: filterStudents
                })
            } else {
                throw "Students not found";
            }
        } catch (err) {
            res.status(400).send({
                error: err
            });
            console.log(err);
        }
    },
    async getGroups(req, res){
        try{
            let teacher = await User.findOne({_id: req.userData.id});
            let groups = await Group.find({_id: {$in: teacher.groups}});
            res.send({
                groups: groups
            });
        }catch(err){
            res.send({
                error: err
            });
            console.log(err);
        }
    }
}