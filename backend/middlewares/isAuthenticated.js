// bina database se contact kiye authenticate karna hai , token aur SECRET_KEY ka istemal karke

import jwt from "jsonwebtoken";

const isAuthenticated = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"user is not Authenticated",
            success:false
        })
    }
    const decode = jwt.verify(token,process.env.SECRET_KEY);
    if(!decode){
        return res.status(401).json({
            message:"invalid token",
            success:false
        })
    }
    req.id = decode.userId;   // req mein ek id naam ka variable bana ke user._id assign kar rahe hain
    next();
}

export default isAuthenticated;