const questionTypes = require("../../../models/quiz/questionTypes");

exports.typeController = async(req, res)=>{
    const {title} = req.body;
    try {
        
    
    if(!title){
        return res.status(400).json({msg: "Please provide a type of question"})
    }
    const findDuplicate = await questionTypes.findOne({title, createdBy : req.admin.id})
    if(findDuplicate){
        return res.status(409).json({msg: "This type of question already exists"})
    }
    const newType = new questionTypes({title, createdBy: req.admin.id, updatedBy: req.admin.id})
    await newType.save()
    return res.status(200).json({msg: "Question type added successfully"})
} catch (error) {
    console.log(error)
        return res.status(500).json({msg : "Server Error"})
}
}