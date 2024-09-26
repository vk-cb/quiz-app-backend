const freeTest = require("../../../models/quiz/freeTest");
const { status } = require("../../../utils/statuscodes");

exports.freeQueAddController = async (req, res)=>{
    const {title, type, typeTitle,category,categoryTitle,options, answer} = req.body;
    try {
        const newQuestion = new freeTest({title,admin : req.admin.id, type,typeTitle,category,categoryTitle, options, answer, createdBy: req.admin.id, updatedBy: req.admin.id})
        await newQuestion.save()
        return res.status(status.created).json({msg: "Question created successfully", question : newQuestion})
    } catch (error) {
        console.error(error)
        return res.status(status.serverError).json({msg: "Server Error"})
    }
}

exports.getAdminFreeQue = async (req, res) => {
    const {filter} = req.body
    try {
        if(!filter){
            const Allquestions = await freeTest.find({createdBy: req.admin.id}).sort({createdAt: -1})
            return res.status(status.success).json({msg: "All questions fetched successfully", Allquestions})
        }
        const Allquestions = await freeTest.find({createdBy : req.admin.id, isActive:true, type: filter}).sort({createdAt: -1})
        return res.status(status.success).json({msg: "Filtered questions fetched successfully", Allquestions})
    } catch (error) {
        console.error(error)
    return res.status(status.serverError).json({msg: "Server Error"})
    }
}  

exports.updateFreeQuestion = async(req, res)=>{
    const {questionId} = req.params;
    const {title, type, typeTitle, category, categoryTitle, options, answer} = req.body;
   try {
    const question = await freeTest.findById(questionId)
    if(!question){
        return res.status(status.notFound).json({msg: "Question not found"})
    }
    const updatedQuestion = {title, type, typeTitle, category, categoryTitle, options, answer}
    const updatedQuestionData = await freeTest.findByIdAndUpdate(questionId,updatedQuestion, {new : true})
    return res.status(status.success).json({msg: "Question updated successfully", data : updatedQuestionData})
   } catch (error) {
    console.error(error)
    return res.status(status.serverError).json({msg: "Server Error"})
   }
}

exports.deleteFreeQuestion = async (req, res) => {
    const { questionId } = req.params;
    try {
        const question = await freeTest.findById(questionId);
        if (!question) {
            return res.status(status.notFound).json({ msg: "Question not found" });
        }

       if(question.isActive === false){
        return res.status(status.badRequest).json({ msg: "Question is already deleted" });
       }
        question.isActive = false;
        const updatedQuestion = await question.save(); // Save the updated document

        return res.status(status.success).json({ msg: "Question deleted successfully", data: updatedQuestion });
    } catch (error) {
        console.error(error);
        return res.status(status.serverError).json({ msg: "Server Error" });
    }
};
exports.enableFreeQuestion = async (req, res) => {
    const { questionId } = req.params;
    try {
        const question = await freeTest.findById(questionId);
        if (!question) {
            return res.status(status.notFound).json({ msg: "Question not found" });
        }

        if(question.isActive ===true){
            return res.status(status.badRequest).json({ msg: "Question is already enabled" });
        }
        question.isActive = true;
        const updatedQuestion = await question.save(); // Save the updated document

        return res.status(status.success).json({ msg: "Question Enable successfully", data: updatedQuestion });

    } catch (error) {
        console.error(error);
        return res.status(status.serverError).json({ msg: "Server Error" });
    }
};


