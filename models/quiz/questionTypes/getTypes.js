exports.getTypeController = async(req, res)=>{
    const types = [{title :"Single choice",
        typeId : 1
    }, {title: "Multiple choice",
        typeId : 2
    }]
    res.status(200).json({types})
}
