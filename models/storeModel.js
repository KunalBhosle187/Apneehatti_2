const mongoose = require('mongoose');

const storeSchema = mongoose.Schema(
    {
        user : {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User'
        },
        store:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        }
        
    }
);

const Store = mongoose.model('Store', storeSchema);

module.exports = Store; 