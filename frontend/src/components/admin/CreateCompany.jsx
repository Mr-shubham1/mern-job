import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companyslice";

const CreateCompany = () => {
  const [companyName,setCompanyName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerCompany = async ()=>{
    try {
      const res = await axios.post(`${COMPANY_END_POINT}/register`,{name:companyName},{
        headers:{
          "Content-Type":"application/json",
        },
        withCredentials:true
        
      });
      if(res.data.success){
        toast(res.data.message);
        dispatch(setSingleCompany(res?.data?.company));
        const companyId = res?.data?.company?._id;
        navigate(`/admin/company/create/${companyId}`);
      }
      
    } catch (error) {
      console.log(error?.response?.data || error?.message);
      toast(error?.response.data.message);
    }

    
  }
  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto my-4">
        <div>
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500 ">
            What Name would you like give your Company ,
            <span>you can change this later...</span>
          </p>
        </div>
        <div className="my-10">
          <Label>Company Name</Label>
          <Input
            type="text"
            className="my-2"
            placeholder="jobHunt Microsoft etc..."
            value={companyName}
            onChange={(e)=>{setCompanyName(e.target.value)}}
          />
        </div>
        <div className="flex items-center gap-x-4 my-10">
          <Button onClick={()=>navigate("/admin/companies")} variant="outline">Cancel</Button>
          <Button onClick={registerCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
