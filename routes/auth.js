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
        isAdmin
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
    
    User
        .findOne({ email: email })
        .then(foundUser => {
            if (foundUser) {
                errors.push('User with such email exists');
                res
                    .status(403)
                    .json({
                        success: false,
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
                errors.push('User with such email not found')
                res 
                    .status(403)
                    .json({
                        success: false,
                        errors
                    })
                return;
            }

            console.log(foundUser.password, password)

            let doPasswordsMatch = comparePasswords(foundUser.password, password);

            if (!doPasswordsMatch) {
                errors.push('Incorrect password!')
                res 
                    .status(403)
                    .json({
                        success: false,
                        errors
                    })
            } else {
                let token = getToken(foundUser._id, foundUser.isTeacher, foundUser.isAdmin);

                res 
                    .status(200)
                    .json({
                        success: true,
                        user: foundUser,
                        token
                    })
            }
        })
})

module.exports = router;