const express = require('express');

const Contest = require('../models/Contest');
const User = require('../models/User');
const Subject = require('../models/Subject');

const { teacherAuth, userAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/createContest', teacherAuth, (req, res) => {
    let {
        name,
        subject,
        description,
        date,
        grade,
        website
    } = req.body;

    const { userId } = req.user;

    let newContest = new Contest({
        name,
        subject,
        description,
        date,
        grade,
        website,
        createdBy: userId
    });

    newContest 
        .save()
        .then(savedContest => {

            Subject 
                .findOne({ _id: subject })
                .then(foundSubject => {
                    foundSubject.contests.push(savedContest._id);

                    foundSubject
                        .save()
                        .then(() => {

                            res 
                                .status(200)
                                .json({
                                    success: true,
                                    contest: savedContest
                                })
                        })
                })
        })
})

router.post('/deleteContest', teacherAuth, (req, res) => {
    const { contestId } = req.body;

    Contest 
        .findOne({ _id: contestId })
        .then(foundContest => {

            foundContest 
                .remove()
                .then((err) => {

                    res 
                        .status(200)
                        .json({
                            success: true
                        })
                })
        })
})

router.post('/featureContest', userAuth, (req, res) => {
    const { userId } = req.user;
    const { contestId } = req.body;

    User 
        .findOne({ _id: userId })
        .then(foundUser => {
            if (foundUser.featuredContests.indexOf(contestId) >= 0) {
                foundUser.featuredContests = foundUser.featuredContests.filter(contest => contest !== contestId);
            } else {
                foundUser.featuredContests.push(contestId);
            }

            foundUser 
                .save()
                .then(savedUser => {
                    res 
                        .status(200)
                        .json({
                            success: true,
                            user: savedUser
                        })
                })
        })
})

module.exports = router;