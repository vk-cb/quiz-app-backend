const express = require("express")
const {SuperAdminSignin} = require('../../controllers/super-admin/index')
const router = express.Router()

router.post('/signin', SuperAdminSignin)

module.exports = router;