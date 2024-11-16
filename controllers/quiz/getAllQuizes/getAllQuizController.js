const quiz = require("../../../models/quiz/quiz")
const { status } = require("../../../utils/statuscodes")

exports.getAllQuizController = async(req, res)=>{
    
    try {
        const findQuiz = await quiz.find({})
        if(!findQuiz){
            return res.status(status.notFound).json({msg: "Quiz not found"})
        }
        return res.status(status.success).json({msg: "Quiz found successfully", data : findQuiz})
    } catch (error) {
        console.error(error)
        return res.status(status.serverError).json({msg: "Server Error"})
    }
}