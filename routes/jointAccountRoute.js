const express = require('express')
const router = express.Router()
const jointAccountController = require('../controllers/jointAccount_view')

router.post('/create', jointAccountController.createJointAccount)
router.get('/all', jointAccountController.getAllJointAccounts)
router.get('/:id/get', jointAccountController.getJointAccountById)
router.put('/:id/update', jointAccountController.updateJointAccount)
router.put('/:id/add-users', jointAccountController.addUsersToJointAccount)
router.put('/:id/remove', jointAccountController.removeUserFromJointAccount)
router.delete('/:id', jointAccountController.deleteJointAccount)

module.exports = router