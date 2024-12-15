import React from "react";
import { Button } from "./ui/button";
import { Bookmark, Ghost } from "lucide-react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";

// const jobid = "sdfghjhgfd";
const Job = ({job}) => {
  const navigate = useNavigate();
  return (
    <div className="p-2 w-[240px] h-fit border border-gray-100 shadow-xl bg-white rounded-md">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 days ago</p>
        <Button variant="outline" classname="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" classname="rounded-full p-6" size="icon">
          <Avatar className="cursor-pointer rounded-full">
            <AvatarImage
              src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
              alt="@shadcn"
            />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <span className={"text-blue-700 text-sm font-bold "}>{job?.openings} positions</span>
        <Badge className={"text-[#F83002] "} variant={Ghost} >{job?.jobtype}</Badge>
        <Badge className={"text-[#7209b7] "} variant={Ghost} >{job?.salary/100000} LPA</Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button onClick={(e)=>navigate(`/description/${job?._id}`)} variant="outline">Details </Button>
        <Button className="bg-[#7209b7]">Save for later</Button>
      </div>
    </div>
  );
};

export default Job;
