const soldQuiz = require("../../../models/quiz/buyQuiz")

exports.soldQuizController = async(req, resp)=>{
    const findAllQuiz = await soldQuiz.find({adminId : req.admin.id})
    if(!findAllQuiz) return resp.status(404).json({msg: "No quiz purchased"})
        
    return resp.status(200).json({msg: "All purchased quizzes fetched successfully", data: findAllQuiz})
}

exports.activeAndRejectController = async(req, res)=>{
    const findQuizUser = await soldQuiz.find({userId : req.userId, adminId : req.admin.id})
    if(!findQuizUser){
        return res.status(404).json({msg: "No quiz purchased by this user"})
    }
    
}