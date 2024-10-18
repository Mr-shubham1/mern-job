import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup} from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_END_POINT } from "@/utils/constant";
import { toast } from "sonner";



const Login = () => {
const [input,setInput] = useState({
    email:"",
    password:"",
    role:""
});
const onChangeEventHandler = (e)=>{
    setInput({...input,[e.target.name]:e.target.value});     // just spread karke over write kar raha hun  , [e.target.name]   ise bracket me likh ke js ko bata raha hu ki evaluate hone ke baad jo bhi yahan aayega use as a key (for an object of course) treat kae naa ki as a string 
}
// login karne par api call hoaga
const navigate = useNavigate();
const onSubmitHandler = async (e)=>{
      try {
        e.preventDefault();
        const res = await axios.post(`${USER_END_POINT}/login`,input,{
          headers:{"Content-Type":"application/json"},
          withCredentials:true
        })
        if(res.data.success){
          navigate("/");
          toast.success(res.data.message);
        }
        
        
      } catch (error) {
        console.log("catch error in onSubmitHandler" + error);
        toast.error(error.response.data.message);
        
      }
        
}




  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-5xl mx-auto">
        <form
          className="w-1/2 border border-gray-200 rounded p-4 my-4"
          onSubmit={onSubmitHandler}
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" name="email" value={input.email} onChange={onChangeEventHandler}  placeholder="example@gmail.com" />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input type="password" name="password" value = {input.password} onChange={onChangeEventHandler}  placeholder="enter Password" />
          </div>
          <div className="flex items-center justify-between flex-wrap">
            <RadioGroup
              defaultValue="comfortable"
              className="flex items-center gap-4 my-4"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked = {input.role === "student"}
                  onChange={onChangeEventHandler} 
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={onChangeEventHandler} 
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">recruiter</Label>
              </div>
            </RadioGroup>            
          </div>
          <Button type="submit" className="w-full my-2">Login</Button>
          <span className="text-sm">Don't have an account ? <Link className="text-blue-600" to="/signup" >Sign up</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Login;
