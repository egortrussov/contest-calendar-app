const express = require('express');

const Subject = require('../models/Subject');

const router = express.Router();

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