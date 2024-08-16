const purchasedCourse = require("../../../models/quiz/purchasedCourse")

exports.purchasedQuizController = async(req, resp)=>{
    const findAllQuiz = await purchasedCourse.find({adminId : req.admin.id})
    if(!findAllQuiz) return resp.status(404).json({msg: "No quiz purchased"})
        
    return resp.status(200).json({msg: "All purchased quizzes fetched successfully", data: findAllQuiz})
}

exports.activeAndRejectController = async(req, res)=>{
    const findQuizUser = await purchasedCourse.find({userId : req.userId, adminId : req.admin.id})
    if(!findQuizUser){
        return res.status(404).json({msg: "No quiz purchased by this user"})
    }
    
}