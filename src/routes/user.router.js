const express = require('express');
const Controller = require('../controllers/user.controller');

const router = express.Router();

router.get('/user', Controller.getUser);

module.exports = router;
