import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { setUser } from '@/redux/authslice';


const Updateprofilepicdialogue = ({open,setOpen}) => {

  const user = useSelector(store=>store.auth.user);
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);
  const [input,setInput] = useState({
    file:user?.profile?.profilephoto
  })
  const fileChangeHandler = (e)=>{
    const file = e.target.files[0];
    setInput({...input,file:file});
  }

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    setLoading(true);
    const formdata = new FormData();
    if(input.file){
      // console.log(input.file)
      formdata.append("file",input.file);
    }

    try {
      const res = await axios.post(`${USER_END_POINT}/profilepic/update`,formdata,{
      headers:{
        "Content-Type":"multipart/form-data"
      },
      withCredentials:true
      })

      if(res.data.success){
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        
        setOpen(false);
      }

    } catch (error) {
      console.log("catch error in profile pic updating :- "+ error);
      toast.error(error.message);
      setLoading(false);
    } finally{
      setLoading(false);
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
            <DialogTitle>Edit profile pic</DialogTitle>
          </DialogHeader>
          <form action="" onSubmit={onSubmitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 gap-x-4 items-center">
                <Label htmlFor="profile_pic" className="text-right">Profile Pic</Label>
                <input
                  className=" col-span-3 "
                  type="file"
                  accept="image/*"
                  id="profile_pic"
                  name="profilephoto"
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

  )
}

export default Updateprofilepicdialogue;
