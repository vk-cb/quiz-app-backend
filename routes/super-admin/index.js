const express = require("express")
const {SuperAdminSignin} = require('../../controllers/super-admin/index')
const { pendingAdmin } = require("../../controllers/admin/adminController")
const { superAdminMiddlware } = require("../../middleware/super-admin")
const router = express.Router()

router.post('/signin', SuperAdminSignin)
router.get('/get-all-admins', superAdminMiddlware, pendingAdmin)

module.exports = router;