const express = require('express')
const { adminSignupController, adminLoginController} = require('../../controllers/admin/adminController')
const { categoryController, categoryListController, categoryUpdateController, deactivateCategory } = require('../../controllers/quiz/category')
const { adminmiddleware } = require('../../middleware/admin')
const { typeController, deleteTypeContoller, getAdminQuestionType } = require('../../controllers/quiz/queTypes')
const { getTypeController } = require('../../models/quiz/questionTypes/getTypes')
const { addNewQuestion, getAllAdminquestions, getAdminQuestionById, updateAdminQuestionById, deleteQuestionbyAdmin } = require('../../controllers/quiz/questions')
const { soldQuizController } = require('../../controllers/admin/soldQuizes')

const router = express.Router()


// auth
router.post('/signup', adminSignupController)
router.post('/login', adminLoginController)


// category 
router.post('/create-category',adminmiddleware, categoryController)
router.get('/get-category',adminmiddleware, categoryListController)
router.put('/update-category/:categoryId',adminmiddleware, categoryUpdateController)
router.post('/delete-category/:categoryId', adminmiddleware, deactivateCategory)

// type
router.post('/create-type',adminmiddleware, typeController)
router.get('/get-type',adminmiddleware, getTypeController)
router.get('/get-que-type', adminmiddleware, getAdminQuestionType)
router.post('/delete-type/:typeId',adminmiddleware, deleteTypeContoller)


// quiz questions routes

router.post('/add-question', adminmiddleware, addNewQuestion)
router.get('/get-questions', adminmiddleware, getAllAdminquestions)
router.get('/get-question/:questionId', adminmiddleware, getAdminQuestionById)
router.put('/update-question/:questionId', adminmiddleware, updateAdminQuestionById)
router.delete('/delete-question/:questionId', adminmiddleware, deleteQuestionbyAdmin)

// quiz routes
router.get('/sold-quiz', adminmiddleware, soldQuizController)


module.exports = router;