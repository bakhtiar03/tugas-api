const express = require('express');
const userController = require('../controllers/userController');
const middleware = require('../middleware/middleware')

const router = express.Router();

router.get('/user', userController.getUser);
router.post ('/register', userController.register)
router.get('/userdetails/:id', middleware.verifyToken, userController.getDetailUser)
router.delete('/userdelete/:id', userController.deleteUser)
router.put('/userupdate/:id', userController.updateUser)
router.post('/login', userController.login)

module.exports = router;
