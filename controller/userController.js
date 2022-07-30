const User = require("../models/userSchema");
const Otp = require("../models/otpModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken")
const nodemailer = require('nodemailer')

//Register

const registerUser = asyncHandler(async(req, res)=>{
    const {name, email, mobile, password }= req.body;
    const userExist = await User.findOne({email}) || await User.findOne({mobile})
    if(userExist){
        throw new Error('User Already Exists !')
        res.status(400)
    }
    const user = await User.create({name, email , mobile, password})
    if(user){
       res.status(201).json({
        _id: user._id,
        name:user.name,
        email:user.email,
        mobile:user.mobile,
        password:user.password,
        isAdmin:user.isAdmin,
        token:generateToken(user._id)
       })
    
    }else{
        throw new Error("User Not Registerd")
        res.status(404);
    }
})


//login
const authController =  asyncHandler(async (req, res) => {
   const { email , password } = req.body;
   const user = await User.findOne({email});
   if(user && (await user.matchPassword(password))){
        res.json({
           _id: user._id,
           name:user.name,
           email:user.email,
           isAdmin:user.isAdmin,
           token:generateToken(user._id)
       })
   }else{
       throw new Error("User already exist")
       res.status(401)
     
   }
});



const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        return res.json({
            _id: user._id,
            name:user.name,
            email:user.email,
            mobile:user.mobile,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }else{
        throw new Error("User Not Found")
        res.status(404);
    }
   
});

const updateUserProfile = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id)
    if(user){
       user.name = req.body.name || user.name
       user.email = req.body.email || user.email
       user.mobile = req.body.mobile || user.mobile
       if(req.body.password){
           user.password = req.body.password
       }
       const updateUser = await user.save()
       res.json({
        _id: updateUser._id,
        name:updateUser.name,
        email:updateUser.email,
        mobile:updateUser.mobile,
        password:updateUser.password,
        isAdmin:updateUser.isAdmin,
        token:generateToken(updateUser._id)
       })
    }else{
        throw new Error("user Not Found")
        res.status(404)
    }
})



const emailSend = asyncHandler( async(req,res)=>{
    console.log(req.body.email)
    const data = await User.findOne({email:req.body.email})
    console.log(data)
    const responseType = {};
    if(data){
        const otpcode = Math.floor((Math.random()*10000)+1);
        const otpData = new Otp({
            email:req.body.email,
            code:otpcode,
            expireIn: new Date().getTime() + 300 * 1000
        })
        const otpResponse = await otpData.save();
        responseType.statusText = 'Success';
        responseType.message = 'Please Check your Email Id'

        // ///////////////////////////
           // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
      service:'gmail',
    //   secure: false, // true for 465, false for other ports
      auth: {
        user: "kunalbhosle555@gmail.com " ,// generated ethereal user
        pass: "Kunalshree@96k", // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Apneehatti 👻" <apneehatti@gmail.com>', // sender address
      to: req.body.email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: `Your Otp is ${otpcode} Password Recover Link : http://localhost:3000/resetpassword`, // plain text body
      html: `<b>Your Otp is ${otpcode}</b><br/>
      <span>Password Recovery Link :</span>
      <a href="https://apneehatti.herokuapp.com/resetpassword">https://apneehatti.herokuapp.com/resetpassword</a>`, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        // //////////////////////////
        if(info.messageId){
            console.log("email send")
            throw new Error("Please check your email")
        }else{
            console.log("email not")
            throw new Error("Something went wrong") 
        }
    }else{
        throw new Error('Invalid Email');

    }
    res.status(200).json(Error)
})

const changePassword = asyncHandler(async(req,res)=>{
    const data = await Otp.findOne({email:req.body.email , code:req.body.otp })
    if(data){
        console.log('data found')
        const currentTime = new Date().getTime();
        const TokenExpiryStatus = data.expireIn - currentTime ;
        if(TokenExpiryStatus < 0){
            console.log('Token Expire')
            throw new Error('OTP Expire')
        }else{
            const user = await User.findOne({email:req.body.email}) 
            if(user){
                user.password = req.body.password;
                user.save();
                console.log("Password Successfully Change");
                throw new Error('Password SuccessFully Change Go To Login')
                res.status(200)
            }else{
                throw new Error('Invalid Email')
                res.status(404)
            }
        }

    }else{
        console.log("No data Found")
        throw new Error('Something went wrong')
        res.status(404)
    }
})

const mailer = (email,otp) => {
    const transporter = nodemailer.createTransport({
        service:'gmail',
        port:587,
        secure:false,
        auth:{
            user:'node@gmail.com',
            pass:'989898'
        }
    });

    const mailOptions = {
        from:"node@gmail.com",
        to:"",
        subject:"testing nodemailer",
        text:"Thank you sir"
    }

    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }else{
            console.log('Email sent :' + info.response);
        }
    });
}


  
 

module.exports = { authController , getUserProfile , registerUser , updateUserProfile, emailSend , changePassword };