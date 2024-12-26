import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Contact, Mail, Pen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Updateprofilepicdialogue from "./Updateprofilepicdialogue";


// const skills = ["HTML","CSS","Javascript","ReactJS","ExpressJS","MongoDB"]
let isResume = false;
const Profile = () => {
    const [open1,setOpen1] = useState(false);
    const [open2,setOpen2] = useState(false);
    const user = useSelector(store=>store.auth.user);
    const navigate = useNavigate();

    // Redirect to home if user is not authenticated
    useEffect(() => {
        if (!user) {
            navigate("/"); // Redirect to home page
        }
    }, [user, navigate]);
    if(user?.profile?.resume){
      isResume = true;
    }
    // console.log(user?.profile?.profilephoto);
    const skills = user?.profile?.skills[0]?.replace(/\s+/g," ").split(" ");
    // console.log(skills.length);
  return (
    <div>
      <Navbar />
      <div className=" max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl my-4 p-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                className="cursor-pointer"
                onClick={()=>setOpen2(true)}
                src={user?.profile?.profilephoto || "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"}
                alt="@shadcn"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p className="text-sm">
                {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button onClick = {()=>setOpen1(true)} className="text-right" variant="outline" size="icon">
            <Pen />
          </Button>
        </div>
        <div className="my-2">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span> <a className="text-blue-800" href={user?.email ? `mailto:${user.email}` : '#'}>{user?.email || 'No email available'}</a></span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-4">
            <h1>Skills</h1>
            <div className="flex items-center gap-1">
            {
                   skills?.length!==0?skills?.map((item , index)=>{
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
                isResume ? <a target="blank" href={user?.profile?.resume} className="text-sm text-blue-500 hover:underline">{user?.profile?.resumeoriginalname}</a> : <span>NA</span>
            }
            </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto border border-gray-200 bg-white rounded-2xl mb-6">
            <h1 className="font-bold text-lg mt-5 pl-4">Applied Jobs</h1>
            {/* Applied Job Table */}
            <AppliedJobTable/>
      </div>
      <UpdateProfileDialog open={open1} setOpen = {setOpen1}/>
      <Updateprofilepicdialogue open = {open2} setOpen = {setOpen2} />
    </div>
  );
};

export default Profile;
