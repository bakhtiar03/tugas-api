const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/user', userController.getUser);
router.post ('/register', userController.register)
router.get('/userdetails/:id',userController.getDetailUser)
router.delete('/userdelete/:id', userController.deleteUser)
router.put('/userupdate/:id', userController.updateUser)

module.exports = router;
