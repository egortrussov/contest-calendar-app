const express = require('express');

const Organisation = require('../models/Organisation');

const router = express.Router();

router.post('/createOrganisation', (req, res) => {
    const { name } = req.body;

    let newOrganisation = new Organisation({
        name
    })

    newOrganisation 
        .save()
        .then(savedOrganisation => {
            res 
                .status(200)
                .json({
                    success: true,
                    organisation: savedOrganisation
                })
        })
})

module.exports = router;