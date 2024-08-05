const express = require('express')
const { adminSignupController, adminLoginController } = require('../../controllers/admin/adminController')

const router = express.Router()

router.post('/signup', adminSignupController)
router.post('/login', adminLoginController)

module.exports = router;