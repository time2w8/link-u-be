const express = require('express');
const morgan = require('morgan');
const passport = require('passport');

/*----------inst--------------*/
const app = express();
require('./security/passport-local');
/*---------------------------*/

/*----------config-sets--------------*/
app.set('port', process.env.PORT || 4000);
/*----------------------------------*/

/*-------express-uses----------*/
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
/*----------------------------*/

/*---------routes----------*/
app.use('/links', require('./routes/link_routes'));
app.use('/users', require('./routes/user_routes'));
app.use(require('./routes/auth_routes'));
/*------------------------*/

/*---------init----------*/
app.listen(app.get('port'), () => {
    console.log('Server up on port ', app.get('port'));
})
/*------------------------*/
