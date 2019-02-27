const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require('../config/config');

module.exports = {
    async registerUser(req, res) {
        try {
            // Check email for existence
            let user = await User.findOne({ 
                email: req.body.email
            });
            if (user) {
                throw "Пользователь уже зарегистрирован"
            } else {
                let newUser = new User({
                    name: req.body.name,
                    role: req.body.role,
                    email: req.body.email,
                    password: req.body.password,
                    groups: [],
                    tests: []
                });
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
    async loginUser(req, res) {
        try {
            let user = await User.findOne({
                email: req.body.email
            });
            if (user) {
                let password = await bcrypt.compare(req.body.password, user.password);
                if (!password) {
                    throw "Неверный пароль"
                } else {
                    const token = jwt.sign({
                            email: user.email,
                            id: user._id
                        },
                        config.secret, {
                            expiresIn: '7d'
                        });
                    
                    return res.send({
                        user: {
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            id: user._id,
                            groups: user.groups,
                            tests: user.tests
                        },
                        token: token
                    });
                }
            } else {
                throw "Пользователь не найден"
            }
        } catch (err) {
            res.send({
                error: err
            });
        }
    },
    async changePassword(req, res) {
        try {
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(req.body.newPassword, salt);

            await User.update({
                _id: req.userData.id
            }, {
                password: hash
            });

            res.send({
                message: 'Пароль обновлен'
            });
        } catch (err) {
            res.send({
                error: 'Ошибка'
            });
        }
    }
}