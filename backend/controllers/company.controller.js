import Company from "../models/company.model.js";


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
};      // ✅ tested

// get conmpany ,      when a user wants its company details that was created by him , get it
export const getCompany = async (req, res) => {
  try {
    const  userID  = req.id; // logged in user
    
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
};     // ✅ tested

// getCompany by Id   , that is by company id
export const getCompanyById = async (req, res) => {
  try {
    const  companyId  = req.params.id;
   
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
};    // ✅ tested

// update company
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    //  idhar cloudinary aayega

    const updatedata = { name, description, website, location };
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
      success: true,
    });
  } catch (error) {
    console.log("catch error in updateCompany :- " + error);
  }
};    // ✅ tested

// all are (protected)   route