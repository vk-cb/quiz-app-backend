const questions = require("../../../models/quiz/questions");

exports.addNewQuestion = async(req, res)=>{
    const {title, type, typeTitle,category,categoryTitle,options, answer} = req.body;
    if(!title ||!type || !typeTitle ||!options ||!answer){
        return res.status(400).json({msg: "Please provide all required fields"})
    }
    try {
        const newQuestion = new questions({title, type,typeTitle,category,categoryTitle, options, answer, createdBy: req.admin.id, updatedBy: req.admin.id})
        await newQuestion.save()
        return res.status(201).json({msg: "Question created successfully", question : newQuestion})
    } catch (error) {
        console.error(error)
        return res.status(500).json({msg: "Server Error"})
    }
}

exports.getAllAdminquestions = async(req, res)=>{
    try {
        const {filter} = req.body;
        if(!filter){
            const Allquestions = await questions.find({createdBy: req.admin.id, isActive: true}).sort({createdAt: -1})
            return res.status(200).json({msg: "All questions fetched successfully", Allquestions})
        }
        const Allquestions = await questions.find({createdBy: req.admin.id, type: filter, isActive: true}).sort({createdAt: -1})
        return res.status(200).json({msg: "Filtered questions fetched successfully", Allquestions})
       
    } catch (error) {
        console.error(error)
        return res.status(500).json({msg: "Server Error"})
    }
}

exports.getAdminQuestionById = async(req, res)=>{
    const {questionId} = req.params;

    if(!questionId){
        return res.status(400).json({msg: "Please provide a valid question ID"})
    }
    try {
        const question = await questions.findById(questionId).populate("createdBy", "name")
        if(!question){
            return res.status(404).json({msg: "Question not found"})
        }
        return res.status(200).json({msg: "Question fetched successfully", question})
    } catch (error) {
        console.error(error)
        return res.status(500).json({msg: "Server Error"})
    }
}

exports.updateAdminQuestionById = async(req, res)=>{
    const {questionId} = req.params;
    const {title, type, typeTitle, options, answer} = req.body;
    if(!questionId ||!title ||!type ||!typeTitle ||!options ||!answer){
        return res.status(400).json({msg: "Please provide all required fields"})
    }
    try {
        const findQuestion = await questions.findById({_id :questionId})
        if(!findQuestion){
            return res.status(404).json({msg: "Question not found"})
        }
        const updatedQuestion = {title, type,typeTitle, options, answer}
        const updatedQuestionData = await questions.findByIdAndUpdate(questionId, updatedQuestion, {new: true})
        return res.status(200).json({msg: "Question updated successfully", data : updatedQuestionData})
    } catch (error) {
        console.error(error)
        res.status(500).json({msg : "server error"})
    }
}

exports.deleteQuestionbyAdmin = async(req, res)=>{
    const {questionId} = req.params;
    if(!questionId){
        return res.status(400).json({msg: "Please provide a valid question ID"})
    }
    try {
        const findQuestion = await questions.findByIdAndDelete(questionId)
        if(!findQuestion){
            return res.status(404).json({msg: "Question not found"})
        }
        return res.status(200).json({msg: "Question deleted successfully"})
    } catch (error) {
        console.error(error)
        return res.status(500).json({msg: "Server Error"})
    }
}