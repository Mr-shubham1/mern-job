import React from "react";
import { Button } from "./ui/button";
import { Bookmark, Ghost } from "lucide-react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";

const Job = () => {
  return (
    <div className="p-2 w-[240px] border border-gray-100 shadow-xl bg-white rounded-md">
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
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates, possimus similique a assumenda accusamus culpa ullam minima repellat blanditiis ex!</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700  "} variant={Ghost} >12 Positions</Badge>
        <Badge className={"text-[#F83002] "} variant={Ghost} >Part Time</Badge>
        <Badge className={"text-[#7209b7] "} variant={Ghost} >24 LPA</Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button variant="outline">Details</Button>
        <Button className="bg-[#7209b7]">Save for later</Button>
      </div>
    </div>
  );
};

export default Job;
