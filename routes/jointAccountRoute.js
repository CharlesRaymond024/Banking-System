const express = require('express')
const router = express.Router()
const jointAccountController = require('../controllers/jointAccount_view')
const authenticateToken = require('../middlewares/authenticateToken')
const verifyRoles = require('../middlewares/verifyRoles')
const roleList = require('../helpers/roleList')

router.route('/create')
  .post(authenticateToken, verifyRoles(roleList.User, roleList.CustomerCare, roleList.SuperAdmin, roleList.Admin), jointAccountController.createJointAccount)
router.route('/all')
  .get(authenticateToken, verifyRoles(roleList.CustomerCare, roleList.SuperAdmin), jointAccountController.getAllJointAccounts)
// route to get jointAccount by id
router.route('/:id/get')
.get(authenticateToken, verifyRoles (roleList.Admin, roleList.SuperAdmin, roleList.CustomerCare), jointAccountController.getJointAccountById)
router.route('/:id/update')
.put(authenticateToken, verifyRoles (roleList.CustomerCare, roleList.SuperAdmin, roleList.User), jointAccountController.updateJointAccount)
router.route('/:id/add-users')
.put(authenticateToken, verifyRoles (roleList.CustomerCare, roleList.SuperAdmin, roleList.User), jointAccountController.addUsersToJointAccount)
router.route('/:id/remove')
  .put(authenticateToken, verifyRoles (roleList.CustomerCare, roleList.SuperAdmin, roleList.User), jointAccountController.removeUserFromJointAccount)
router.route('/:id')
  .delete(authenticateToken, verifyRoles (roleList.CustomerCare, roleList.SuperAdmin), jointAccountController.deleteJointAccount)

module.exports = router