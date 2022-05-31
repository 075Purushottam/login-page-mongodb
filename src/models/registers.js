const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    uname :{
        type:String,
        required:true
    },
    psw:{
      type:String,
      required:true
    },
    cpsw:{
        type:String,
        required:true
      }
})

const Register = new mongoose.model("Register", userSchema);
module.exports= Register;