const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/signup', passport.authenticate('local_signup', { session: false }), async (req, res, next) => {
    res.json({
        message: req.authInfo.message
    })
});

router.post('/login', passport.authenticate('local_login', { session: false }), async (req, res, next) => {
    res.json({
        message: req.authInfo.message
    })
});

module.exports = router;