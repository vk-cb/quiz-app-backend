const category = require("../../../models/quiz/category");
const { exists } = require("../../../models/quiz/questions");

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

exports.categoryListController = async(req, resp)=>{
    try {
        const categories = await category.find({createdBy: req.admin.id}).sort({updatedAt: -1})
        return resp.json({msg: "All Categories", data : categories})
    } catch (error) {
        console.log(error)
        return resp.status(500).json({msg : "Server Error", error})
    }
}

exports.categoryUpdateController = async(req, resp)=>{
    const {title} = req.body;
    const {categoryId} = req.params;
    if(!title){
        return resp.status(400).json({msg: "Please provide a title for the category"})
    }
    try {
        const findTitle = await category.findOneAndUpdate({_id: categoryId, createdBy: req.admin.id}, {title, updatedBy: req.admin.id})
        if(!findTitle) return resp.status(404).json({msg: "Category not found"})
        const updatedCategory = {
    id: findTitle._id,
    title: title,
    createdBy: findTitle.createdBy,
    updatedBy: req.admin.id,
    createdAt: findTitle.createdDate,}
        return resp.json({msg: "Category updated successfully", category: updatedCategory})
    } catch (error) {
        console.log(error)
        return resp.status(500).json({msg : "Server Error", error})
    }
}

// exports.categoryDeleteController = (req, res)=>{
//     const {id} = req.params;
//     try {
//         // Check if the category contains any questions before deleting it.
//         const findCategory = await category.findOne({id})
//         if(!findCategory) return res.status(404).json({msg: "Category not found"})

//         await category.findOneAndDelete({_id: id, createdBy: req.admin.id})
//         if(!findCategory) return res.status(404).json({msg: "Category not found"})
//         const questions = await exists.find({categoryId: findCategory._id})
//         if(questions.length > 0) return res.status(400).json({msg: "Category cannot be deleted as it contains questions})
            
//             return res.json({msg: "Category deleted successfully"})
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({msg : "Server Error", error})
//     }
// }