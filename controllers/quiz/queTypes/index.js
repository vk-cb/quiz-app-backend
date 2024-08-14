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

exports.getAdminQuestionType = async (req, res) => {
    const { isActive} = req.body;
    let findTypes;
  
    if (!isActive  || isActive === null) {
      findTypes = await questionTypes.findOne({ createdBy: req.admin.id, isActive: true });
    } else if(isActive=== "not-active") {
      findTypes = await questionTypes.findOne({  createdBy: req.admin.id, isActive:false});
    }
  
    if (!findTypes) {
      return res.status(404).json({ msg: "Question type not found" });
    }
  
    return res.status(200).json({msg: "Question types fetched successfully",data:findTypes});
  };

exports.deleteTypeContoller  = async(req, res)=>{
    const {typeId} =  req.params;
    const findTypeAndDelete = await questionTypes.findOne({_id : typeId, createdBy: req.admin.id})

    if(!findTypeAndDelete){
        return res.status(404).json({msg: "Question type not found"})
    }
    try {
        const updatedType = {
            title: findTypeAndDelete.title,
            createdBy: findTypeAndDelete.createdBy,
            updatedBy: req.admin.id,
            isActive: false,
        }
        await findTypeAndDelete.updateOne(updatedType)
        return res.status(200).json({msg: "Question type deleted successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Server Error"})
    }
}