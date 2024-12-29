import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
      <div className="max-w-3xl mx-auto mt-8">
        <div className="flex items-center justify-between my-3">
          <Input
            onChange={(e) => {
              setSearchinput(e.target.value);
            }}
            value={searchinput}
            className="w-fit sm:w-60 px-4 py-2  rounded-lg shadow-lg  focus-visible:ring-0 focus-visible:ring-offset-0   bg-gradient-to-br from-purple-100 via-white to-blue-100"
            placeholder="Filter by name or role"
          />
          <Button className="bg-purple-800 hover:bg-purple-900" onClick={() => navigate("/admin/jobs/create")}>
            Post new Job
          </Button>
        </div>
      </div>
      <AdminJobsTable />
    </div>
  );
};

export default Adminjobs;
