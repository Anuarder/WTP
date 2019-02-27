const Course = require('../models/Course');

module.exports = {
    async createCourse(req, res){
        try{
            let group = await Course.findOne({
                name: req.body.name
            });
            if (group) {
                throw "Группа уже созданна"
            } else {
                let newCourse = new Course({
                    name: req.body.name,
                    department: req.body.department,
                    teachers: req.body.teacher,
                });

                // Save new Course
                await newCourse.save();

                res.send({
                    message: "Register new Course"
                });
            }
        }catch(err){
            res.send({
                error: err
            });
        }
    }
}