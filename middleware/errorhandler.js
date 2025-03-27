const errorHandler = (err,req,res,next) =>{
    console.error(err.stack)


if (err.name === "ValidationError"){
    const messages = Object.values(err.errors).map((val)=>val.message)
    return res.status(400).json({
        success: false,
        error: messages
    })
}

if (err.name === "CastError"){
    return res.status(400).json({
        success: false,
        error: "Invalid ID"
    })
}

res.status(500).json({
    success: false,
    error:"Server Error"
})
}
module.exports = errorHandler
