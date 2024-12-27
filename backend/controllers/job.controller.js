import Job from "../models/job.model.js";

// create job
export const postJob = async (req,res)=>{
    try {
        const {title,description,requirements,salary,location,jobtype,openings,experience,companyId} = req.body;
        if(!title || !description || !salary || !location || !jobtype || !openings || !experience || !companyId || !requirements){
            return res.status(400).json({
                message:"something is missing",
                success:false
            })
        }
        const job = await Job.create({
            title,
            description,
            requirements,
            salary,
            location,
            jobtype,
            openings,
            experience,
            company:companyId,
            created_by:req.id                    // logged in user
        })

        return res.status(200).json({
            message:"job posted successfully",
            job,
            success:true
        })
        
    } catch (error) {
        console.log("catch error in postjob :- "+ error);
    }
}       // ✅ tested

// read jobs     for students
export const getalljobs = async (req,res)=>{
    // mujhe isme filter bhi lagana hai
    // filter lagane ke liye query ka use karte hain


    try {
        // basically keywords ke basis pe search karunga
        const keyword = req.query.keyword || "";     // req ke query mein yadi keyword hua toh ye :-  req.query.keyword    nahi toh empty string

        // is keyword se ek querry create karenge
        const query = {
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]
        }
        const jobs = await Job.find(query).populate({
            path:"company"
        });
        if(!jobs){
            return res.status(404).json({
                message:"jobs not found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })

    } catch (error) {
        console.log("catch error in getalljobs");
    }
}       // ✅ tested

//               ⭐ i have to understand it 
// const query = {
//     $or:[
//         {title:{$regex:keyword,$options:"i"}},
//         {description:{$regex:keyword,$options:"i"}}
//     ]
// }
// const jobs = await Job.find(query);



// read jobById       
export const getJobById = async (req,res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate(
            {
                path: "application", // Populate the application field
                populate: {
                  path: "applicant", // Populate the applicant field within application
                  model: "User" // Ensure the applicant field is populated from the User model
                }
              }
        );
        if(!job){
            return res.status(404).json({
                message:"job not found",
                success:false
            })
        }
        return res.status(200).json({
            job,
            success:true
        })
        
    } catch (error) {
        console.log("catch error in getJobById :-" + error);
    }
}        // ✅ tested


// read job for admin i.e. job creator  :- by this controller job creator can see all his jobs that he created
export const getJobsByCreator = async (req,res)=>{
    try {
        const creatorId = req.id;
        const jobs = await Job.find({created_by:creatorId}).populate({
         path:"company"   
        }).sort({createdAt:-1});
        if(!jobs){
            return res.status(404).json({
                message:"jobs not found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
        
    } catch (error) {
        console.log("catch error in getJobsByCreator :- "+ error);
    }
}          // ✅ tested
