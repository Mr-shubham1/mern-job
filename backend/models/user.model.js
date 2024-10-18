import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    fullname:{
        type:String, 
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{ 
        type:String,
        enum:["student","recruiter"],   // user ya toh student ho sakta hai ya recruiter ho sakta hai
        required:true
    },
    profile:{
        bio:{
            type:String,
            default:""
        }, 
        skills:[{
            type:String
        }],
        resume:{
            type:String    // url to file
        },
        resumeoriginalname:{
            type:String
        },
        company:{
            type:mongoose.Schema.Types.ObjectId,
            ref:`Company`
        },
        profilephoto:{
            type:String,
            default:""
        }
    }
},{timestamps:true})

const User = mongoose.model("User",userschema);

export default User;