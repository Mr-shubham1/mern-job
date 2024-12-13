import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/authslice";
import { toast } from "sonner";
import { USER_END_POINT } from "@/utils/constant";
import { Loader2 } from "lucide-react";



const UpdateProfileDialog = ({ open, setOpen }) => {
  // const {open, setOpen} = props;
  const [loading,setLoading] = useState(false);
  const user = useSelector(store=>store.auth.user);
  const dispatch = useDispatch();
  // console.log(user);
  const [input , setInput] = useState({
    fullname:user?.fullname,
    email:user?.email,
    phoneNumber:user?.phoneNumber,
    bio:user?.profile?.bio,
    skills:user?.profile?.skills.map((item)=>{return (item)}),
    file:user?.profile?.resume
  })

  const onChangeEventHandler = (e)=>{
    // console.log(e.target.name);
    setInput({...input,[e.target.name]:e.target.value})
  }
  const fileChangeHandler = (e)=>{
   const file = e.target.files[0];
   setInput({...input,file});

  }

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    setLoading(true);
    const formdata = new FormData();
    formdata.append("fullname",input.fullname);
    formdata.append("email",input.email);
    formdata.append("phoneNumber",input.phoneNumber);
    formdata.append("bio",input.bio);
    formdata.append("skills",input.skills);
    if(input.file){
      formdata.append("file",input.file)
    }

    try {
      const res = await axios.post(`${USER_END_POINT}/profile/update`,formdata,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true
      })
      if(res.data.success){
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setLoading(false);
        setOpen(false);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }
  }
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => {
            setOpen(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <form action="" onSubmit={onSubmitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 gap-x-4 items-center">
                <Label htmlFor="name" className="text-right">Name</Label>
                <input
                  className="border border-gray-400 col-span-3 "
                  type="text"
                  id="name"
                  name="fullname"
                  value={input.fullname}
                  onChange={onChangeEventHandler}
        
                />
              </div>
              <div className="grid grid-cols-4 gap-x-4 items-center">
                <Label htmlFor="email" className="text-right">Email</Label>
                <input
                  className="border border-gray-400 col-span-3 "
                  type="email"
                  id="email"
                  name="email"
                  value={input.email}
                  onChange={onChangeEventHandler}
                />
              </div>
              <div className="grid grid-cols-4 gap-x-4 items-center">
                <Label htmlFor="number" className="text-right">PhoneNumber</Label>
                <input
                  className="border border-gray-400 col-span-3 "
                  id="number"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={onChangeEventHandler}
                />
              </div>
              <div className="grid grid-cols-4 gap-x-4 items-center">
                <Label htmlFor="bio" className="text-right">Bio</Label>
                <input
                  className="border border-gray-400 col-span-3 "
                  type="text"
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={onChangeEventHandler}
                />
              </div>
              <div className="grid grid-cols-4 gap-x-4 items-center">
                <Label htmlFor="skills" className="text-right">Skills</Label>
                <input
                  className="border border-gray-400 col-span-3 "
                  type="text"
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={onChangeEventHandler}
                />
              </div>
              <div className="grid grid-cols-4 gap-x-4 items-center">
                <Label htmlFor="resume" className="text-right">Resume</Label>
                <input
                  className=" col-span-3 "
                  type="file"
                  accept="application/pdf"
                  id="resume"
                  name="resume"
                  onChange={fileChangeHandler}
                />
              </div>
            </div>
            <div>
            {
            loading ? <Button className="w-full my-2"> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait </Button> : <Button type="submit" className="w-full my-2">Update Profile</Button>
            }
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default UpdateProfileDialog;
