const express = require('express');
const { userAuth, teacherAuth, adminAuth } = require('../middleware/auth');

const Subject = require('../models/Subject');

const router = express.Router();

router.post('/test', adminAuth, (req, res) => {
    res 
        .json({
            ok: true
        })
})

router.post('/createSubject', (req, res) => {
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

module.exports = router;