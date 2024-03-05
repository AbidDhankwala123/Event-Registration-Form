const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    eventSessions:{
        type:String,
        enum:["Introduction to Web Development","Data Science Workshop","UX/UI Design Panel Discussion","Cloud Computing Trends"],
        required:true
    }
});

const User = mongoose.model("User",userSchema);

module.exports = User