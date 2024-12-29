import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectdb from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.router.js";
import jobRoute from "./routes/job.router.js";
import applicationRoute from "./routes/application.route.js"
dotenv.config({});
const app = express();


// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:[
    "http://localhost:5173",                   // localhost of frontend    (port no. of vite react :- 5173)   , it means we will use vite react for front end
    "https://mern-job-frontend-gj8r.onrender.com"],  // deployed frontend
    credentials: true,
}
app.use(cors(corsOptions));

// app.get("/",(req,res)=>{
//     res.status(200).json({"success":true});
// })


// API's
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);






const PORT = process.env.PORT ||  8000;
app.listen(PORT,()=>{
connectdb();
console.log(`server is running on port ${PORT}`);
})