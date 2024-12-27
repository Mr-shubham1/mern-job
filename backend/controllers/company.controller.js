import Company from "../models/company.model.js";
import {v2 as cloudinary} from "cloudinary"

//   register / create company
export const registerCompany = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "company name is required",
        success: false,
      });
    }
    // check if company is alraedy exist
    let company = await Company.findOne({ name });
    if (company) {
      return res.status(400).json({
        message: "company already registered with this name",
        success: false,
      });
    }
    company = await Company.create({
      name,
      userID: req.id, // logged in user id    // comming from isAuthenticated middleware
    });
    return res.status(200).json({
      message: "company registered successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log("catch error in registerCompany:- " + error);
  }
}; // ✅ tested

// get conmpany ,      when a user wants its company details that was created by him , get it
export const getCompany = async (req, res) => {
  try {
    const userID = req.id; // logged in user

    if (!userID) {
      return res.status(400).json({
        message: "you must be logged in",
        success: false,
      });
    }
    let companies = await Company.find({ userID });
    if (!companies) {
      return res.status(404).json({
        message: "no companies found",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log("catch error in getCompany:- " + error);
  }
}; // ✅ tested

// getCompany by Id   , that is by company id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    let company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log("catch error in getCompanyById :- " + error);
  }
}; // ✅ tested

// update company
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    //  idhar cloudinary aayega

    // Cloudinary setup/configuring
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_CLOUD_KEY,
      api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
    });

    // Handle Cloudinary file upload
    const uploadToCloudinary = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profiles", resource_type: "auto" },
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

    let optimizedUrl = "";
    if (req.file && req.file.buffer) {
      try {
        const uploadresult = await uploadToCloudinary(req.file.buffer);
        optimizedUrl = cloudinary.url(uploadresult.public_id, {
          fetch_format: "auto",
          quality: "auto",
        });
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        return res.status(500).json({
          message: "Image upload failed",
          success: false,
        });
      }
    }

    const updatedata = { name, description, website, location , logo:optimizedUrl };
    // console.log(requirements);
    let company = await Company.findByIdAndUpdate(req.params.id, updatedata, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({
        message: "company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "company updated successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log("catch error in updateCompany :- " + error);
  }
}; // ✅ tested

// all are (protected)   route
