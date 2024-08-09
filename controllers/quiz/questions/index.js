const questions = require("../../../models/quiz/questions");

exports.addNewQuestion = async(req, res)=>{
    const {title, type, options, answer} = req.body;
    if(!title ||!type ||!options ||!answer){
        return res.status(400).json({msg: "Please provide all required fields"})
    }
    try {
        const newQuestion = new questions({title, type, options, answer, createdBy: req.admin.id, updatedBy: req.admin.id})
        await newQuestion.save()
        return res.status(201).json({msg: "Question created successfully", question : newQuestion})
    } catch (error) {
        console.error(error)
        return res.status(500).json({msg: "Server Error"})
    }
}