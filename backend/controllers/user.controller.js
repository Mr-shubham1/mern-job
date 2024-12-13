import  User  from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from "cloudinary";


// All Business logics Related with User

// register business logic :- register a new user in database
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    // checking if anything is missing ?
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    
    // check if with this email there  is already a user registered
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user already exist with this email",
        success: false,
      });
    }

    // now hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // now i will i will store image file on cloudinary and get the URL of that
    
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐
// Cloudinary setup/configuring
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});
// Handle Cloudinary image upload
// Initialize optimizedUrl variable
let optimizedUrl = '';
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'profiles', resource_type: 'auto' },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );
    stream.end(fileBuffer); // Send the file buffer to the stream
  });
};
if (req.file && req.file.buffer) {
  try {
    // Upload the image to Cloudinary using the helper function
    const uploadResult = await uploadToCloudinary(req.file.buffer);

    // Generate an optimized URL for the uploaded image
    optimizedUrl = cloudinary.url(uploadResult.public_id, {
      fetch_format: 'auto',
      quality: 'auto',
    });
    // console.log(optimizedUrl);
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return res.status(500).json({
      message: "Image upload failed",
      success: false,
    });
  }
}
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      //profile{profilephoto:req.file?req.file.path:""}  // ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐  ye tha hi nahi yaha pe, maine add kiya hai    this line i may use i have opted for disc storage multer
      profile:{
        profilephoto:optimizedUrl
      }  
    });
    return res.status(201).json({
      message: "Account created Successfully",
      success: true,
    });
  } catch (error) {
    console.log("catch error in register" + ":-  " + error);
  }
};    // ✅ tested

// Login business logic for User :- matlab ki backend se user ko/frontend pe token provide/set karna
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    let user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            message:"invalid user or password",
            success:false
        })
    }

    const ispasswordmatched = await bcrypt.compare(password,user.password);
    if(!ispasswordmatched){
        return res.status(400).json({
            message:"invalid user or password",
            success: false
        })
    }

    user = {
        _id:user._id,
        fullname:user.fullname,
        phoneNumber:user.phoneNumber,
        role:user.role,
        email:user.email,
        profile:user.profile
    }
    // now create token using jsonwebtoken
    const tokendata = {
        userId:user._id
    }
    const token = jwt.sign(tokendata, process.env.SECRET_KEY, { expiresIn: '1d' });

    // set this token into cookie
    // 
    
    return res.status(200).cookie('token', token, { 
      maxAge: 1 * 24 * 60 * 60 * 1000,  // 1 day in milliseconds
      httpOnly: true,                   // Ensuring that token cannot be accessed by JavaScript
      sameSite: 'strict'                // Ensure sameSite is passed as a string
    }).json({
      message: `welcome back ${user.fullname}`,
      success: true,
      user
    });

  } catch (error) {
    console.log("catch error in login" + " "+ error);
  }
};       // ✅ tested

// logout business logic for user :- matlab user ke cookie ko empty string se replace kar denge
export const logout =async (req,res)=>{
    try {
        res.status(200).cookie("token","",{maxAge:0}).json({
            message:"you are logged out",
            success:true
        })
    } catch (error) {
        console.log("catch error in logout"+" "+error)
    }
}                // // ✅ tested

// update profile business logic for user
export const updateprofile = async (req,res)=>{
    try {
        const {fullname,email,phoneNumber,bio,skills} = req.body;
        
        // skills string ke form mein aayega pahle use array mein convert kar lenge
        let skillsArray;
        if(skills){
           skillsArray = skills.split(",");
        }
        



        // Cloudinary setup/configuring
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_CLOUD_KEY,
          api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
        });


        // Handle Cloudinary file upload
        // Initialize optimizedUrl variable
          let optimizedUrl = '';
          const uploadToCloudinary = (fileBuffer) => {
            return new Promise((resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream(
                { folder: 'profiles', resource_type: 'auto' },
                (error, result) => {
                  if (error) {
                    return reject(error);
                  }
                  resolve(result);
                }
              );
              stream.end(fileBuffer); // Send the file buffer to the stream
            });
          };

          if(req.file && req.file.buffer){
            try {
              const uploadresult = await uploadToCloudinary(req.file.buffer);
              optimizedUrl = cloudinary.url(uploadresult.public_id, {
                fetch_format: 'auto',
                quality: 'auto',
              }); 
            } catch (error) {
              console.error("Error uploading image to Cloudinary:", error);
              return res.status(500).json({
                message: "Image upload failed",
                success: false,
              });
            }
          }


                  // .........................................................
        // Update toh tabhi karega jab logged in hoga
        const userId = req.id;  // middleware authentication    // baad mein iske bare mein detail mein study karenge  (basically req mein id kaise aaya)    ✅Understood
        let user = await User.findById(userId);




        if(user){      // matlab ki user logged in hai
            // update the user
            if(fullname){user.fullname = fullname;}
            if(email){user.email = email;}
            if(phoneNumber){user.phoneNumber = phoneNumber;}
            if(bio){user.profile.bio = bio;}
            if(skills){user.profile.skills = skillsArray;}

            if(optimizedUrl){user.profile.resume = optimizedUrl;}
            

            await user.save();
        }
        if(!user){
            return res.status(400).json({
                message:"You must be logged in to update the profile",
                success:false
            })
        }

        user = {
            fullname:user.fullname,
            _id:user._id,
            role:user.role,
            profile:user.profile,
            email:user.email,
            phoneNumber:user.phoneNumber
        }

        return res.status(200).json({
            message:"profile updated successfully",
            user,
            success:true
        })

    } catch (error) {
        console.log("catch error in profileupdate"+" "+error);
    }
}      // ✅ tested