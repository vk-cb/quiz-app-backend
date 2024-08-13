exports.getTypeController = async(req, res)=>{
    const types = [{single :"Single choice",
        typeId : 1
    }, {multiple: "Multiple choice",
        typeId : 2
    }]
    res.status(200).json({types})
}