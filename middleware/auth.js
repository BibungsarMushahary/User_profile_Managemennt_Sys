const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
    console.log('Protect middleware triggered');
    
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log('No token found in headers');
        return res.status(401).json({ 
            message: 'Not authorized, no token',
            receivedHeader: authHeader || 'undefined'
        });
    }

    const token = authHeader.split(' ')[1];
    
    try {
        console.log('Verifying token:', token);
        const decoded = jwt.verify(token, process.env.Jwt_key);
        console.log('Decoded token:', decoded);

        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            console.log('User not found for ID:', decoded.id);
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        console.log('User authenticated:', user.email);
        next();
        
    } catch (error) {
        console.error('Authentication error:', error.message);
        res.status(401).json({ 
            message: 'Not authorized',
            error: error.message,
            token: token 
        });
    }
};

const authorize = (req,res,next)=>{
    if(req.user && req.user._id.toString()=== req.params.id){
        next()
    }else{
        res.status(403).json({message:"Not Authorize to access"})
    }
}

module.exports ={protect,authorize}