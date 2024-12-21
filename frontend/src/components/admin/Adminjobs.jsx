import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setsearchCompanyBytext } from "@/redux/companyslice";
import AdminJobsTable from "./AdminJobsTable";
import { setSearchJobBytext } from "@/redux/jobslice";

const Adminjobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchinput, setSearchinput] = useState("");
  useEffect(() => {
    dispatch(setSearchJobBytext(searchinput));
  }, [searchinput]);
  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between my-6">
          <Input
            onChange={(e) => {
              setSearchinput(e.target.value);
            }}
            value={searchinput}
            className="w-fit"
            placeholder="Filter by name"
          />
          <Button onClick={() => navigate("/admin/company/create")}>
            New Job
          </Button>
        </div>
      </div>
      <AdminJobsTable />
    </div>
  );
};

export default Adminjobs;
