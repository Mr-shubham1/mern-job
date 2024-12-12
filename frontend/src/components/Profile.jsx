import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Contact, Mail, Pen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";


const skills = ["HTML","CSS","Javascript","ReactJS","ExpressJS","MongoDB"]
const isResume = true;
const Profile = () => {
    const [open,setOpen] = useState(false);
  return (
    <div>
      <Navbar />
      <div className=" max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl my-4 p-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="@shadcn"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">Full name</h1>
              <p className="text-sm">
                Add your bio here Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Ad, non?
              </p>
            </div>
          </div>
          <Button onClick = {()=>setOpen(true)} className="text-right" variant="outline" size="icon">
            <Pen />
          </Button>
        </div>
        <div className="my-2">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>roman@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>1654253658</span>
          </div>
        </div>
        <div className="my-4">
            <h1>Skills</h1>
            <div className="flex items-center gap-1">
            {
                skills.length!==0? skills.map((item , index)=>{
                    return (
                        <Badge key={index}>{item}</Badge>
                    )
                }) : <span>NA</span>
            }
            </div>
        </div>
        <div className="flex flex-col">
            <Label className="font-bold">Resume</Label>
            <div>
            {
                isResume ? <a target="blank" href="" className="text-sm text-blue-500 hover:underline">Resume Link</a> : <span>NA</span>
            }
            </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto border border-gray-200 bg-white rounded-2xl mb-6">
            <h1 className="font-bold text-lg mt-5 pl-4">Applied Jobs</h1>
            {/* Applied Job Table */}
            <AppliedJobTable/>
      </div>
      <UpdateProfileDialog open={open} setOpen = {setOpen}/>
    </div>
  );
};

export default Profile;
