const jwt = require("jsonwebtoken")

const generateToken =(userId)=>{
    return jwt.sign({id: userId},process.env.Jwt_key,{
        expiresIn: "4hr",
    })
}

const verifytoken = (token) =>{
    return jwt.verify(token,process.env.Jwt_key)
}

module.exports = {generateToken, verifytoken}