var express = require('express');
var jwt = require('express-jwt');
const router = express.Router();

var auth = jwt({
    secret: "Some_secret",
    algorithms: ['HS256'],
    userProperty: 'payload',
});

const ctrlProfile = require('../controllers/profile');
const ctrlAuth = require('../controllers/authentication');

router.get('/profile', auth, ctrlProfile.profileRead);

router.post('/register',ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;