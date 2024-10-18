import mongoose from "mongoose";

const companyschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String
    },
    website:{
        type:String  // URL
    },
    location:{
        type:String
    },
    logo:{
        type:String    // URL
    },
    userID:{      // company creator
        type:mongoose.Schema.Types.ObjectId,
        ref:`User`,
        required:true
    }
},{timestamps:true});

const Company = mongoose.model("Company",companyschema);

export default Company;