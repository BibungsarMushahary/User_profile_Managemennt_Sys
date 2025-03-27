const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userschema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Provide a name Please"],
        trim: true,
        maxlength:[50,"Name length shouldn't be more than 50 characters"],
    },
    email:{
        type: String,
        required:[true,"Provide an email Please"],
        unique: true,
        trim : true,
    },
    password:{
        type:String,
        required:[true,"Provide a password Please"],
        minlength:[6,"The password should have at least 6 characters"],
        select: false,
    },
    address:{
        type:String,
        required: [true,"Provide an address Please"],
        trim: true,
    },
    bio :{
        type:String,
        trim: true,
        maxlength:[300,"Bio must not exceed 300 words"],
        default:'',
    },
    profilepicture:{
        type:String,
        default: '',
    },
    createdat:{
        type:Date,
        default:Date.now,
    },

})

userschema.pre('save',async function(next){
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

userschema.methods.matchPassword = async function(enteredPassword) {
    if (!enteredPassword) {
        throw new Error('No password provided for comparison');
    }
    if (!this.password) {
        throw new Error('No stored password found for this user');
    }
    return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("Userinfo",userschema)