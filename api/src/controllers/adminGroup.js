const Group = require('../models/Group');

module.exports = {
    async createNewGroup(req, res){
        try{
            let group = await Group.findOne({
                name: req.body.name
            });
            if (group) {
                throw "Группа уже созданна"
            } else {
                let newGroup = new Group({
                    name: req.body.name,
                    students: req.body.students,
                    courses: req.body.courses,
                });

                // Save new group
                await newGroup.save();

                res.send({
                    message: "Register new Group"
                });
            }
        }catch(err){
            res.send({
                error: err
            })
        }
    }
}