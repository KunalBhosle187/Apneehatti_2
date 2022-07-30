const mongoose =require('mongoose');
const bcrypt = require('bcryptjs');

const adminModel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
     },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:true,
    }
 
},{timestamps:true})

adminModel.methods.matchPassword = async function (enterPassword){
    return await bcrypt.compare(enterPassword, this.password);
}

//we are hashing the password

adminModel.pre('save',async function(next){
    if(!this.isModified("password")){
        next();
    }
    console.log("password converting into hashing");
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
 
  next();
})


const Admin = mongoose.model('Admin',adminModel);

module.exports = Admin;