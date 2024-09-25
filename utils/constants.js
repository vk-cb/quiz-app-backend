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
