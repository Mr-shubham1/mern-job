import React from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";

const Companies = () => {
const navigate = useNavigate();
  
  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between my-6">
          <Input className="w-fit" placeholder="Filter by name" />
          <Button onClick={()=>navigate("/admin/company/create")}>New Company</Button>
        </div>
      </div>
      <CompaniesTable/>
    </div>
  );
};

export default Companies;
