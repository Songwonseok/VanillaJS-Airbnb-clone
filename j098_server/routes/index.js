const express = require('express');
const router = express.Router();

const signup = require('./signup')
const login = require('./login')
const main = require('./main')

const sessionCheck = require('../middleware/sessionCheck')

router.use(sessionCheck);
router.use(signup);
router.use(login);
router.use(main);


module.exports = router;
