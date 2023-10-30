const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    // id :{
    //     type:Number,
    //     required:true
    // },
    data : {
        type : String,
        required :[true,"must provide name"],
        trim:true,
        maxlength:[30,"length cannot be more than 30 characters"]
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    time:{
        type:Date,
        default:Date.now().toString()
    }
})

const model = new mongoose.model("Task",UserSchema);
module.exports = model;      