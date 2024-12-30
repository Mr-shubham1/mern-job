import React from "react";
import { Button } from "./ui/button";
import { Bookmark, Ghost } from "lucide-react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";


// const jobid = "sdfghjhgfd";
const Job = ({job}) => {
  const navigate = useNavigate();
  const daysagofunction = (mongodbTime)=>{
    if (!mongodbTime) {
      console.error("Invalid date provided.");
      return null;
    }
    const createdTime = new Date(mongodbTime);
    // console.log(createdTime);
    const currentTime = new Date();
    // console.log(currentTime);
    const timeDiff = currentTime-createdTime; // this time is in milisecond
    const timeDiffinDays = timeDiff/(24*60*60*1000);
    // console.log(timeDiff+" in millisecond");
    // console.log(timeDiffinDays+" in days");
    return Math.floor(timeDiffinDays);
  }
  // daysagofunction(job?.createdAt);
  return (
    
    <div className="p-2 w-[240px] h-fit border border-gray-100 shadow-xl bg-white rounded-md transition-transform transform hover:scale-105 hover:shadow-2xl">
      <div className="flex items-center justify-between">
        <p className=" text-xs text-gray-500 italic">{daysagofunction(job?.createdAt)} days ago</p>
        <Button variant="outline" classname="rounded-full" size="icon">
          <Bookmark size={18} />
        </Button>
      </div>

      <div className="flex items-center gap-4 mb2">
        <Avatar className="cursor-pointer rounded-full shadow-md">
          <AvatarImage
            src={
              job?.company?.logo ||
              "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
            }
            alt={job?.company?.name || "Company Logo"}
          />
        </Avatar>
        <div>
          <h1 className="font-medium text-lg text-gray-800">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>
      <div className="mb-2">
        <h1 className="font-bold text-xl text-gray-900 leading-tight mb-1">{job?.title}</h1>
        <p className="text-sm text-gray-800 leading-snug tracking-wide line-clamp-3">{job?.description}</p>
      </div>
      <div className="flex items-center justify-around mt-2">
        <span className={"text-blue-700 text-sm font-semibold "}>{job?.openings} positions</span>
        <Badge className={"text-[#F83002]"} variant={Ghost} >{job?.jobtype}</Badge>
        <Badge className={"text-[#7209b7] "} variant={Ghost} >{job?.salary} LPA</Badge>
      </div>
      <div className="flex items-center justify-between px-2 mt-4">
        <Button className="h-7 w-fit px-3" onClick={(e)=>navigate(`/description/${job?._id}`)} variant="outline">Details </Button>
        <Button className="bg-[#7209b7] h-7 w-fit px-3">Save for later</Button>
      </div>
    </div>
    
    
  );
};

export default Job;
