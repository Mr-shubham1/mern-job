import React from "react";
import { Badge } from "./ui/badge";
import { Ghost } from "lucide-react";
import { useNavigate } from "react-router-dom";



// const jobid = "sdfghjhgfd";
const LatestJobCard = ({job}) => {
  const navigate = useNavigate();
  return (
    <div onClick={(e)=>navigate(`/description/${job?._id}`)} className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl">
      <div>
        <h1 className="font-medium text-lg" >{job?.company?.name}</h1>
        <p className="text-sm text-gray-500" >{job?.location}</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2" >{job?.title}</h1>
        <p className="text-sm text-gray-800 leading-snug tracking-wide line-clamp-3">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant={Ghost} >{job?.openings} Positions</Badge>
        <Badge className={"text-[#F83002] font-bold"} variant={Ghost} >{job?.jobtype}</Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant={Ghost} >{job?.salary/100000} LPA</Badge>
      </div>
    </div>
  );
};

export default LatestJobCard;
