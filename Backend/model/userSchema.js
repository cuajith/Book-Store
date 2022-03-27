const mongoose= require('mongoose')

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type: String,
        default: "user"
    },
    cart : [],
    orders : []
})

module.exports = mongoose.model("User", userSchema)