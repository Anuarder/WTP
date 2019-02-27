const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
    async createNewUser(req, res) {
        try {
            // Check email for existence
            let user = await User.findOne({
                email: req.body.email
            });
            if (user) {
                throw "Пользователь уже зарегистрирован"
            } else {
                let newUser;
                if(req.body.role == 'student'){
                    newUser = new User({
                        name: req.body.name,
                        role: req.body.role,
                        email: req.body.email,
                        password: req.body.password,
                        group: false
                    });
                }else{
                    newUser = new User({
                        name: req.body.name,
                        role: req.body.role,
                        email: req.body.email,
                        password: req.body.password,
                    });
                }
                // Hash password 
                let salt = await bcrypt.genSalt(10);
                let hash = await bcrypt.hash(newUser.password, salt);

                newUser.password = hash;

                // Save new user
                await newUser.save();

                res.send({
                    message: "Register new User"
                });
            }
        } catch (err) {
            res.send({
                error: err
            });
        }
    },
    async getTeachers(req, res){
        try{
            let teachers = await User.find({role: 'teacher'});
            let filterTeachers = [];
            for(teacher of teachers){
                name = teacher.name.toLowerCase();
                if(name.indexOf(req.body.searchText.toLowerCase()) > -1 == true){
                    filterTeachers.push({
                        id: teacher._id,
                        name: teacher.name
                    });
                }
            }
            res.send({
                teachers: filterTeachers
            })
        }catch(err){
            res.send({
                error: err
            })
        }
    }
}