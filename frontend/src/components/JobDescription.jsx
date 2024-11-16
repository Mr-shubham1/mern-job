import React from "react";
import { Badge } from "./ui/badge";
import { Ghost } from "lucide-react";
import { Button } from "./ui/button";

const JobDescription = () => {
  const isApplied = false;
  return (
    <div className="max-w-4xl mx-auto my-10">
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-xl">Front end eveloper</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700  "} variant={Ghost}>
              12 Positions
            </Badge>
            <Badge className={"text-[#F83002] "} variant={Ghost}>
              Part Time
            </Badge>
            <Badge className={"text-[#7209b7] "} variant={Ghost}>
              24 LPA
            </Badge>
          </div>
        </div>
        <Button  className={`rounded-lg ${isApplied?" bg-gray-600 cursor-not-allowed":"bg-[#7209b7] hover:bg-[#5f32ad]"}`}>{isApplied?"already applied":"Apply now"}</Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</h1>
      <div className="my-4">
        <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">Front end developer</span></h1>
        <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">Hydarabad</span></h1>
        <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">Lorem ipsum dolor sit . Iste, exercitationem. Lorem ipsum dolor sit elit. Pariatur ex optio soluta qui a omnis quae earum adipisci quia saepe libero repudiandae expedita atque eius quasi ea nostrum, natus reiciendis?</span></h1>
        <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">2 Years</span></h1>
        <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">12 LPA</span></h1>
        <h1 className="font-bold my-1">Total Applicants: <span className="pl-4 font-normal text-gray-800">40</span></h1>
        <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">16/11/24</span></h1>
      </div>
    </div>
  );
};

export default JobDescription;
