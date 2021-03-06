const express = require('express');

const User = require('../models/User');
const Organisation = require('../models/Organisation');

const { getToken } = require('./authMiddleware/tokens');
const { hashPassword, comparePasswords } = require('./authMiddleware/passwords');

const router = express.Router();

router.post('/register', (req, res) => {
    let {
        email,
        password,
        fullName,
        organisation,
        isTeacher,
        grade,
        isAdmin,
        secretCode,
    } = req.body;

    let errors = [];

    if (!email || !password || !fullName || !organisation || (!isTeacher && !grade)) 
        errors.push('Fill in all credentials'); 
    
    if (errors.length !== 0) { 
        res 
            .status(403) 
            .json({
                success: false,
                errors
            })
        return;
    }

    if (isTeacher) {
        console.log(secretCode !==  process.env.TEACHER_SECRET_CODE)
        if (secretCode !== process.env.TEACHER_SECRET_CODE) {
            errors['secretCode'] = 'Invalid secret code';
            res 
                .status(403)
                .json({
                    success: false,
                    isCodeError: true,
                    errors
                })
            return;
        }
    }
    
    User
        .findOne({ email: email })
        .then(foundUser => {
            if (foundUser) {
                errors['email'] = 'User with such email exists';
                res
                    .status(403)
                    .json({
                        success: false,
                        isEmailError: true,
                        errors
                    })
                return;
            }

            password = hashPassword(password);
            
            let newUser = new User({
                email,
                password,
                fullName,
                organisation,
                isTeacher,
                grade,
                isAdmin
            })

            newUser 
                .save()
                .then(savedUser => {
                    let token = getToken(savedUser._id, savedUser.isTeacher, savedUser.isAdmin);

                    Organisation 
                        .findOne({ _id: organisation })
                        .then(foundOrganisation => {
                            foundOrganisation.members.push(savedUser._id);

                            foundOrganisation
                                .save();

                            res 
                                .status(200)
                                .json({
                                    success: true,
                                    user: savedUser,
                                    token
                                })
                        })
                })
        }) 
})

router.post('/login', (req, res) => {
    let { email, password } = req.body;

    let errors = [];

    User 
        .findOne({ email: email })
        .then(foundUser => {
            if (!foundUser) {
                errors['email'] = 'User with such email not found';
                res 
                    .status(403)
                    .json({
                        success: false,
                        isEmailError: true,
                        errors
                    })
                return;
            }

            console.log(foundUser.password, password)

            let doPasswordsMatch = comparePasswords(foundUser.password, password);

            if (!doPasswordsMatch) {
                errors['password'] = 'Incorrect password';
                res 
                    .status(403)
                    .json({
                        success: false,
                        isPasswordError: true,
                        errors
                    })
            } else {
                let token = getToken(foundUser._id, foundUser.isTeacher, foundUser.isAdmin);

                res 
                    .status(200)
                    .json({
                        success: true,
                        user: foundUser,
                        token,
                        expiration: 3
                    })
            }
        })
})

module.exports = router;