// user registration schema
exports.registrationSchema = {
    firstName: 'first name',
    lastName: 'last name',
    email: 'email',
    password: 'password',
  };

exports.loginValidationSchema = {
    email: 'email',
    password: 'password',
}

//user buy quiz schema 
exports.userBuyQuiz = {
    adminId : "admin Id",
    purchaseAmount : "Purchase Amount"
}

//add category

//add types

//add questions

//add free questions 
exports.questionsSchema = {
    title : "Question title",
    type : "Question Type",
    category : "Category",
    options : "option",
    answer : "Answer",
}

//quiz schema validation
exports.quizSchema = {
    instructorName: "Instructor name",
    instructorBio : "instructor bio",
    quizFullDesc : "quiz full description",
    quizShortDesc:"quiz short description"
}
