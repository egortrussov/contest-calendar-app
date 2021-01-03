const express = require('express');
const { userAuth, teacherAuth, adminAuth } = require('../middleware/auth');

const Subject = require('../models/Subject');

const router = express.Router();

router.post('/createSubject', adminAuth, (req, res) => {
    const { name } = req.body;

    let newSubject = new Subject({
        name
    });

    newSubject 
        .save()
        .then(savedSubject => {
            res 
                .status(200)
                .json({
                    success: true,
                    subject: savedSubject
                })
        })
})

router.post('/deleteSubject', adminAuth, (req, res) => {
    const { _id } = req.body;

    Subject
        .findOneAndDelete({ _id: _id }) 
        .then(subject => {
            res 
                .status(200)
                .json({
                    success: true,
                    deletedSubject: subject
                })
        })
})

router.post('/changeSubjectName', adminAuth, (req, res) => {
    const { _id, name } = req.body;

    Subject
        .findOne({ _id: _id }) 
        .then(subject => {
            subject.name = name;

            subject 
                .save() 
                .then(savedSubject => {
                    res 
                        .status(200)
                        .json({
                            success: true,
                            subject: savedSubject
                        })
                })
        })
})

module.exports = router;