const User = require("../models/user")
const {generateToken} = require('../database/jwt')



const registerUser = async (req,res)=>{
    try{
        const{name,email,password,address} = req.body
        const userExists = await User.findOne({email})

        if(userExists){
            return res.status(400).json({
                message: "User Already Exists"
            })
        }
        const user = await User.create ({
            name,
            email,
            password,
            address,
          });
      
          if (user) {
            res.status(201).json({
              _id: user._id,
              name: user.name,
              email: user.email,
              address: user.address,
              token: generateToken(user._id),
            });
          } else {
            res.status(400).json({ message: 'Invalid user data' });
          }
        } catch(error){
          console.error('Registration Error:', error);
          res.status(500).json({ 
            message: 'Server Error',
            error: error.message,
            stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined
          });
        }
}
      
      

const loginUser = async (req, res) => {
  try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select('+password');
      
      if (!user) {
          return res.status(401).json({ 
              message: 'Invalid email or password',
              details: 'User not found'
          });
      }

      console.log('User found, password exists:', !!user.password); 

      const isMatch = await user.matchPassword(password);
      
      if (!isMatch) {
          return res.status(401).json({ 
              message: 'Invalid email or password',
              details: 'Password does not match'
          });
      }

      user.password = undefined;

      res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
      });

  } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ 
          message: 'Login Failed',
          error: error.message,
          ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
      });
  }
};
      
      module.exports = { registerUser, loginUser };
