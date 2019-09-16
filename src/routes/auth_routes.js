const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/signup', passport.authenticate('local_signup', { session: false }), async (req, res, next) => {
    res.json({
        message: req.authInfo.message
    })
});

router.get('/logout', function (req, res) {
    req.logout();
    res.send('Logged out');
});

router.post('/login', async (req, res, next) => {
    passport.authenticate('local_login', async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error('An Error occured')
                return next(error);
            }

            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);
                const body = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    fname: user.fname,
                    lname: user.lname
                }
                const token = jwt.sign({ user: body }, process.env.TOKEN_KEY || 'top_secret');
                return res.json(token);
            })
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

module.exports = router;