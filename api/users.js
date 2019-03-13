const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys').secretOrKey;
const User = require('../models/User');

const users = express.Router();

// Load Input Validation
const validateRegisterInput = require('../validations/register');
const validateLoginInput = require('../validations/login');

users.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);

    //check validations
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    };

    User.findOne({
        where: {
            email: req.body.email,
        },
    })
        .then(user => {
            if (!user) {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        userData.password = hash;
                        User.create(userData)
                            .then(user => {
                                res.status(200).json(user);
                            })
                            .catch(err => {
                                res.status(400).json(err);
                            });
                    });
                });
            } else {
                res.status(400).json({email: 'User already exists'});
            }
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

users.post('/login', (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);

    //check validations
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        where: {
            email: req.body.email,
        },
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {id: user.id, username: user.username};
                    let token = jwt.sign(payload, keys, {
                        expiresIn: 3600,
                    });
                    res.json({
                        success: true,
                        token: 'Bearer ' + token,
                    });
                } else {
                    res.status(400).json({password: 'Password is incorrect'});
                }
            } else {
                res.status(400).json({email: 'User does not exist'});
            }
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = users;
