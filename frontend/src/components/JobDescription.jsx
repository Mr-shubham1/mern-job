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

const JobDescription = () => {
  const params = useParams();
  const jobid = params.id;
  const user = useSelector((store) => store.auth.user || {});
  const { singlejob } = useSelector((store) => store.job);
  // console.log(singlejob.job);
  const dispatch = useDispatch();


  const [isApplied, setIsApplied] = useState(singlejob?.job?.application.some((i)=>i.applicant?._id===user._id));
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
  }, [jobid, dispatch, user?._id , isApplied]);

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
    <div className="max-w-4xl mx-auto my-10">
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-xl">{singlejob?.job?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700  "} variant={Ghost}>
              {singlejob?.job?.openings} Positions
            </Badge>
            <Badge className={"text-[#F83002] "} variant={Ghost}>
              {singlejob?.job?.jobtype}
            </Badge>
            <Badge className={"text-[#7209b7] "} variant={Ghost}>
              {singlejob?.job?.salary / 100000} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={!isApplied ? applyJObHndler : undefined}
          className={`rounded-lg ${
            isApplied
              ? " bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "already applied" : "Apply now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        Job description
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.job?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.job?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.job?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.job?.experience} Years
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.job?.salary / 100000} LPA
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.job?.application?.length}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.job?.createdAt?.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;