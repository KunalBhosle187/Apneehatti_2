const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
       
    },
    orderItems:[
        {
            title:{
                type:String,
                required:true,
            },
            qty:{
                type:Number,
                required:true,
            },
            image:[{
                type:String,
                required:true
            }],
            price:{
                type:String,
                required:true
            },
            product:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:'Product'
            },
            store:{
                type:String,
                required:true
            },
            isDelevered:{
                type:Boolean,
                required:true,
                default:false,
            },
            DeleveredAt:{
                type:Date,
            }
        }
    ],
    shippingAddress:{
        fullName:{
            type:String,
            required:true
        },
        shippingMobile:{
            type:Number,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true,
        },
        postalcode:{
            type:Number,
            required:true,
        },
        country:{
            type:String,
            default:"India",
        },
    },
    paymentMethod:{
        type:String,
        required:true,
    },
   
    paymentResults: {
        orderId: {type:String},
        paymentId: {type:String},
        signature: {type:String},
        success: {type:Boolean}
      },
      
      
    shippingPrice:{
        type:Number,
        required:true,
    },
    totalPrice:{
        type:Number,
        required:true,
    },
    isPaid:{
        type:Boolean,
        required:true,
        default:false
    },
    paidAt:{
        type:Date
    },
    isDelevered:{
        type:Boolean,
        required:true,
        default:false,
    },
    DeleveredAt:{
        type:Date,
    },
  
},{timestamps:true})

const Order = mongoose.model("Order", orderSchema);

module.exports = Order ;