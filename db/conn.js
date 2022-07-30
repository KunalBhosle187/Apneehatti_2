const mongoose =require('mongoose');
const DB = process.env.DATABASE;  //used to get file from dotenv file
const amazon = process.env.AMAZON_DATABASE;

mongoose.connect( DB ,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log('connection successful');
}).catch((err)=>console.log(err));


