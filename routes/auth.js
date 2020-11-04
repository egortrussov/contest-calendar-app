const express = require('express');

const User = require('../models/User');

const { getToken } = require('./authMiddleware/tokens');

const router = express.Router();

/*

    Register user 

*/

router.post('/register', (req, res) => {
    const {
        email,
        password,
        fullName,
        organisation,
        isTeacher,
        grade
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
            
            let newUser = new User({
                email,
                password,
                fullName,
                organisation,
                isTeacher,
                grade
            })

            newUser 
                .save()
                .then(savedUser => {
                    let token = getToken(savedUser._id);

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

module.exports = router;