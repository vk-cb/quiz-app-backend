const express  = require("express");
const { userSignupController, userLoginController } = require("../../controllers/users/userController");
const { schemaValidation } = require("../../utils/validation");
const { registrationSchema, loginValidationSchema, userBuyQuiz } = require("../../utils/constants");
const { userMiddlware } = require("../../middleware/user/middleware");
const { buyQuizController } = require("../../controllers/users/buyQuiz");

const router = express.Router()

router.post('/signup',schemaValidation(registrationSchema), userSignupController)
router.post('/login',schemaValidation(loginValidationSchema), userLoginController)

//buy quizes
router.post('/buy-quiz', schemaValidation(userBuyQuiz), userMiddlware, buyQuizController)

module.exports = router;