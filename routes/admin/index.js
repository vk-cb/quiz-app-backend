const express = require('express')
const { adminSignupController, adminLoginController } = require('../../controllers/admin/adminController')
const { categoryController } = require('../../controllers/quiz/category')
const { adminmiddleware } = require('../../middleware/admin')
const { typeController } = require('../../controllers/quiz/queTypes')
const { getTypeController } = require('../../models/quiz/questionTypes/getTypes')

const router = express.Router()

router.post('/signup', adminSignupController)
router.post('/login', adminLoginController)
router.post('/create-category',adminmiddleware, categoryController)
router.post('/create-type',adminmiddleware, typeController)
router.get('/get-type',adminmiddleware, getTypeController)

module.exports = router;