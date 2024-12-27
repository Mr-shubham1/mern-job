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

const companyArray = [];

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
  // console.log(companies);
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
    // console.log(selectedCompany._id);
    setInput({
      ...input,
      companyId: selectedCompany._id,
    });
    // console.log(input);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(input);
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // console.log(res);

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
    <div>
      <Navbar />
      <div className="  flex items-center justify-center  my-4">
        <form
          onSubmit={submitHandler}
          className=" max-w-5xl p-4 border border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-4 ">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="w-52 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className=" focus-visible:ring-0 focus-visible:ring-offset-0"
              />
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
                type="text"
                name="salary"
                value={input.salary}
                placeholder="*numeric only in INR/Year"
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
                type="text"
                name="experience"
                value={input.experience}
                placeholder="*numeric only in Years"
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
            {companies.length !== 0 && (
              <Select onValueChange={selecteventHndler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="*Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => {
                      return (
                        <SelectItem
                          key={company._id}
                          value={company?.name.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          <Button type="submit" className="w-full mx-auto mt-5" disabled={companies.length === 0}>
            {!loading ? "Post new job" : <Loader2 className="animate-spin" />}
          </Button>

          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold mt-4 text-center">
              *Please register a company first, before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Postjobs;
