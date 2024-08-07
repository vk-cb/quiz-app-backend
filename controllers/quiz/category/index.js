const category = require("../../../models/quiz/category");

exports.categoryController = async(req, resp)=>{
    const {title} = req.body;
    if(!title){
        return resp.status(400).json({msg: "Please provide a title for the category"})
    }
    try {
        const findTitle = await category.findOne({title, createdBy: req.admin.id})
        if(findTitle ) return resp.status(400).json({msg: "Category already exists with this title, please try another title."})
            
        const newCategory = new category({title, createdBy: req.admin.id, updatedBy: req.admin.id,})
        await newCategory.save()
        return resp.json({msg: "Category created successfully", category: newCategory})
    } catch (error) {
        console.log(error)
        return resp.status(500).json({msg : "Server Error", error})
    }
}