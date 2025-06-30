import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Ghost } from "lucide-react";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATIO_END_POINT, JOB_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSinglejob } from "@/redux/jobslice";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";
import Footer from "./Footer";

const JobDescription = () => {
  const params = useParams();
  const jobid = params.id;
  const user = useSelector((store) => store.auth.user || {});
  const { singlejob } = useSelector((store) => store.job);
  // console.log(singlejob.job);
  const dispatch = useDispatch();

  const [isApplied, setIsApplied] = useState(
    singlejob?.job?.application.some((i) => i.applicant?._id === user._id)
  );
  useEffect(() => {
    const fetchsinglejob = async () => {
      try {
        const res = await axios.get(`${JOB_END_POINT}/get/${jobid}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSinglejob(res.data));
          setIsApplied(
            res.data.job.application.some(
              (application) => application.applicant._id === user._id
            )
          );
        }
      } catch (error) {
        console.log("catch error in JOB Description :-" + error);
      }
    };
    fetchsinglejob();
  }, [jobid, dispatch, user?._id, isApplied]);

  // const isApplied = false;

  const applyJObHndler = async () => {
    try {
      const res = await axios.get(`${APPLICATIO_END_POINT}/apply/${jobid}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        const updatedjob = {
          ...singlejob.job,
          application: [...singlejob.job.application, { applicant: user?._id }],
        };
        dispatch(setSinglejob(updatedjob));
        setIsApplied(true);
        toast(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast(error.response.data.message);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="font-extrabold text-2xl text-gray-900">
            {singlejob?.job?.title}{" "}
            <span className="font-semibold text-lg">@</span>{" "}
            {singlejob?.job?.company?.name}
          </h1>
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <Badge className="bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full">
              {singlejob?.job?.openings} Positions
            </Badge>
            <Badge className="bg-red-100 text-red-700 font-semibold px-3 py-1 rounded-full">
              {singlejob?.job?.jobtype}
            </Badge>
            <Badge className="bg-purple-100 text-purple-700 font-semibold px-3 py-1 rounded-full">
              ₹{(singlejob?.job?.salary).toFixed(1)} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={!isApplied ? applyJObHndler : undefined}
          className={`mt-4 md:mt-0 rounded-lg text-white px-6 py-2 font-semibold ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <div className="mt-4 ">
        <div className="flex flex-col items-start mb-2 gap-4 sm:flex-row sm:items-center sm:gap-8">
          <img className="h-[100px] w-[100px] object-cover rounded-full border-2 border-purple-600" src={singlejob?.job?.company?.logo} alt=""/>
          <div>
            <div className="text-lg font-bold text-gray-800">Company name:{" "} <span className="font-semibold text-gray-800">{singlejob?.job?.company?.name}</span> </div>
            <div className="text-lg font-bold text-gray-800">Head Office:{" "} <span className="font-semibold text-gray-800">{singlejob?.job?.company?.location}</span> </div>
            <div className="text-lg font-bold text-gray-800">
              Official Website:{" "}
              <a
                target="blank"
                className="text-blue-700"
                href={singlejob?.job?.company?.website}
              >
                {singlejob?.job?.company?.website}
              </a>{" "}
            </div>
          </div>
        </div>
        <div className="text-lg font-bold text-gray-800">About us:{" "} <span className="font-semibold text-gray-800 text-base">{singlejob?.job?.company?.description}</span> </div>
      </div>
      <h1 className="border-b-2 border-gray-300 font-bold text-lg py-4 ">
        Job Description
      </h1>

      <div className="my-4  text-gray-800 ">
        <h1 className="font-bold text-lg flex flex-col sm:flex-row my-4">
          <span className="sm:w-[20%] ">Role:</span>
          <span className=" font-medium sm:w-[80%] ">{singlejob?.job?.title}</span>
        </h1>
        <h1 className="font-bold text-lg flex flex-col sm:flex-row my-4">
          <span className="sm:w-[20%] ">Job Location:</span>
          <span className="font-medium sm:w-[80%] ">{singlejob?.job?.location}</span>
        </h1>
        <h1 className="font-bold text-lg flex flex-col sm:flex-row my-4">
          <span className="sm:w-[20%] ">Description:</span>
          <span className="font-medium sm:w-[80%]  text-base">
            {singlejob?.job?.description}
          </span>
        </h1>
        <h1 className="font-bold text-lg flex flex-col sm:flex-row my-4">
          <span className="sm:w-[20%] ">Requirements:</span>
          <span className=" flex flex-wrap gap-4 font-medium sm:w-[80%]  text-base">
            {singlejob?.job?.requirements[0]?.split(",").length > 0 ? (
              singlejob?.job?.requirements[0]
                ?.split(",")
                .map((skill, index) => (
                  <Button
                    key={index}
                    className="cursor-default px-3 py-1 h-auto rounded-full bg-purple-600 text-white text-sm"
                  >
                    {skill}
                  </Button>
                ))
            ) : (
              <span className="text-sm font-semibold text-gray-700">
                Not specified by the organization
              </span>
            )}
          </span>
        </h1>
        <h1 className="font-bold text-lg flex flex-col sm:flex-row my-4">
          <span className="sm:w-[20%] ">Experience:</span>
          <span className="font-medium sm:w-[80%] ">
            {singlejob?.job?.experience} Years
          </span>
        </h1>
        <h1 className="font-bold text-lg flex flex-col sm:flex-row my-4">
          <span className="sm:w-[20%] ">Salary:</span>
          <span className="font-medium sm:w-[80%] ">{singlejob?.job?.salary} LPA</span>
        </h1>
        <h1 className="font-bold text-lg flex flex-col sm:flex-row my-4">
          <span className="sm:w-[20%] ">Total Applicants:</span>
          <span className="font-medium sm:w-[80%] ">
            {singlejob?.job?.application?.length}
          </span>
        </h1>
        <h1 className="font-bold text-lg flex flex-col sm:flex-row my-4">
          <span className="sm:w-[20%] ">Posted Date:</span>
          <span className="font-medium sm:w-[80%] ">
            {singlejob?.job?.createdAt?.split("T")[0]}
          </span>
        </h1>
      </div>
      
    </div>
    <Footer/>
    </>
    
  );
};

export default JobDescription;