const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require('../config/config');

module.exports = {
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

                    if (user.role == 'student') {
                        return res.send({
                            user: {
                                name: user.name,
                                email: user.email,
                                role: user.role,
                                id: user._id,
                                group: user.group
                            },
                            token: token
                        });
                    } else {
                        return res.send({
                            user: {
                                name: user.name,
                                email: user.email,
                                role: user.role,
                                id: user._id,
                            },
                            token: token
                        });
                    }
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