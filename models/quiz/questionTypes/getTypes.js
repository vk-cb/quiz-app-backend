exports.getTypeController = async(req, res)=>{
    const types = {single :"Single choice", multiple: "Multiple choice"}
    res.status(200).json({types})
}