import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setsearchCompanyBytext } from "@/redux/companyslice";

const Companies = () => {
const navigate = useNavigate();
const dispatch = useDispatch();
const [searchinput,setSearchinput] = useState("");
useEffect(()=>{
  dispatch(setsearchCompanyBytext(searchinput));
},[searchinput]);
  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-8">
        <div className="flex items-center justify-between my-3">
          <Input  onChange={(e)=>{setSearchinput(e.target.value)}} value={searchinput} className="w-fit sm:w-60 px-4 py-2  rounded-lg shadow-lg  focus-visible:ring-0 focus-visible:ring-offset-0   bg-gradient-to-br from-purple-100 via-white to-blue-100" placeholder="Filter by name" />
          <Button className="bg-purple-800 hover:bg-purple-900" onClick={()=>navigate("/admin/company/create")}>Register Company</Button>
        </div>
      </div>
      <CompaniesTable/>
    </div>
  );
};

export default Companies;
