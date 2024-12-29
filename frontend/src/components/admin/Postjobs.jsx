import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Footer from "../Footer";

// const companyArray = [];

const Postjobs = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobtype: "",
    experience: "",
    openings: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const companies = useSelector((store) => store.company.allCompany);

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const selecteventHndler = (value) => {
    const selectedCompany = companies.find((company) => {
      return company.name.toLowerCase() === value;
    });
    setInput({
      ...input,
      companyId: selectedCompany._id,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setLoading(false);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-100 via-white to-blue-100">
      <Navbar />
      <div className="flex items-center justify-center my-10 px-4 ">
        <form
          onSubmit={submitHandler}
          className="max-w-3xl w-full p-6 bg-white border border-gray-200 shadow-lg rounded-md"
        >
          <h1 className="text-xl font-bold mb-6 text-gray-700 text-center">
            Post a New Job
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {companies.length !== 0 && (
              <div className="col-span-1 sm:col-span-2">
                <Label>Company <span className="text-red-800 text-lg">*</span> </Label>
                <Select onValueChange={selecteventHndler}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company?.name.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className=" focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div>
              <Label>Description</Label>
              <textarea
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                rows={2}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-purple-500"
              ></textarea>
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                placeholder="Seperate with commas only"
                value={input.requirements}
                onChange={changeEventHandler}
                className=" focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                placeholder="*INR in Lacs per Year"
                onChange={changeEventHandler}
                className=" focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className=" focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobtype"
                placeholder="Fulltime,Parttime or intern"
                value={input.jobtype}
                onChange={changeEventHandler}
                className=" focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div>
              <Label>Experience</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                placeholder="Years of experience"
                onChange={changeEventHandler}
                className=" focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div>
              <Label>No. of Positions</Label>
              <Input
                type="number"
                name="openings"
                value={input.openings}
                onChange={changeEventHandler}
                className=" focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            
          </div>
          <Button
            type="submit"
            className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2"
            disabled={companies.length === 0 || loading}
          >
            {!loading ? "Post New Job" : <Loader2 className="animate-spin" />}
          </Button>
          {companies.length === 0 && (
            <p className="text-center text-sm text-red-600 mt-4">
              Please register a company before posting a job.
            </p>
          )}
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default Postjobs;
