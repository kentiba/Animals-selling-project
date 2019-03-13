const express = require('express');
const router = express.Router();
const Client = require('../models/Clients');

//Get list of the orders
router.get('/', (req, res) => {
    Client.findAll()
        .then(client => {
            res.json({
                data: client,
            });
        })
        .catch(err => res.status(404).json(err));
});
module.exports = router;
