import Application from "../models/application.model.js";
import Job from "../models/job.model.js"
// applyJob to create application for a job
export const applyJob = async (req,res)=>{
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                message:"jobId is required",
                success:false
            })
        }
        // now check if user has already applied/created application
        const existingapplication =  await Application.findOne({applicant:userId,job:jobId});
        if(existingapplication){
            return res.status(400).json({
                message:"You have already Applied for this Job",
                success:false
            })
        }
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(400).json({
                message:"job does not exist",
                success:false
            })
        }
        // create new application
        const newapplication = await Application.create({
            job:jobId,
            applicant:userId
        });
        await newapplication.populate({
            path:"applicant"
        });
        job.application.push(newapplication._id);
        await job.save();
        return res.status(200).json({
            message:"Applied Successfully",
            newapplication,
            success:true
        })
        
    } catch (error) {
        console.log("catch error in applyJob:- "+error);
    }
}       // ✅ tested

// read application  , ek user jitne application craete kiya hai sare read/get karna hai
// i.e.   student apne saare applications dekhna chahega ki wo kahan - kahan apply kiya hai
export const getAppliedJobs = async (req,res)=>{
    try {
        const userId = req.id;
        const applications = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:"job",
            populate:{path:"company"}
        });
        if(!applications){
            return res.status(400).json({
                message:"You have not applied for any jobs still",
                success:false
            })
        }

        return res.status(200).json({
            applications,
            success:true
        })

    } catch (error) {
        console.log("catch error in getAppliedJobs:- "+error);
    }
    

}       // ✅ tested

// job_creator bhi saare applications dekhana chahega ki kitne apllication uske particular Job ke liye aaye hain
export const getApplicants = async (req,res)=>{
try {
    const jobId = req.params.id;
    const job = await Job.find({_id:jobId}).populate({
       path:"application",
       populate:{path:"applicant"}
    });
    if(!job){
        return res.status(400).json({
            message:"Job not found",
            success:false
        })
    }

    return res.status(200).json({
        job,
        success:true
    })

} catch (error) {
    console.log("catch error in getApplicants:- "+ error);
}
}       // ✅ tested

// update status of application i.e.   accepted, rejected etc
export const updateStatus = async (req,res)=>{
    try {
    const {status} = req.body;
    const applicationId = req.params.id;
    if(!status){
        return res.status(400).json({
            message:"status is required",
            success:false
        })
    }
    const application = await Application.findOne({_id:applicationId});
    if(!application){
        return res.status(400).json({
            message:"application not found",
            success:false
        })
    }

    // now update the status
    application.status = status;
    await application.save();
    return res.status(200).json({
        message:"status updated successfully",
        success:true
    })
        
    } catch (error) {
        console.log("catch error in updateSstatus:- "+error);
    }
    
}        // ✅ tested