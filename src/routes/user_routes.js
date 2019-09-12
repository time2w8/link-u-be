const express = require('express');
const router = express.Router();
const db_pool = require('../mysql');

router.get('/',(req,res) => {
    res.send('user router working!');
})

module.exports = router;