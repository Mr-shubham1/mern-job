import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authslice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const onChangeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value }); // just spread karke over write kar raha hun  , [e.target.name]   ise bracket me likh ke js ko bata raha hu ki evaluate hone ke baad jo bhi yahan aayega use as a key (for an object of course) treat kae naa ki as a string
  };
  // onChangeEventHandler          ye input.profile ko handle nahi kar payega bcz wahan kuchh change nahi ho raha hai key press type ka yaha toh file aa raha hai
  // toh ise dusre tarike se handle karna padega  bcz event toh ho raha hai
  const onChangeFileHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.files?.[0],
    });
  };
  // submit karne par api call hoaga
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("fullname", input.fullname);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("password", input.password);
      formData.append("role", input.role);
      if (input.file) {
        formData.append("file", input.file);
      }
      const res = await axios.post(`${USER_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }); // chunki data jo hume send kar rahe hain wo application/json type ka nahi hai , bcz wo file bhi contain kar raha hai isliye hum direct input nahi bhej sakte , isliye hum pahle input data ko multipart/formData mein convert kar lenge then bhej denge , then backend mein multer ke help se is data ko le lenge
      // console.log(res);
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("catch error in onSubmitHandler :- " + error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100">
      <Navbar />
      <div className="flex items-center justify-center max-w-4xl mx-auto">
        <form
          className="w-full md:w-2/3 lg:w-1/2 border border-gray-200 rounded px-6 py-2  my-2 mx-8"
          onSubmit={onSubmitHandler}
        >
          <h1 className="font-extrabold text-gray-800 text-center text-xl sm:text-2xl mb-3">Create an account</h1>
          <div className="my-2">
            <Label className="font-medium text-gray-700">Fullname</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={onChangeEventHandler}
              placeholder="Enter your name"
            />
          </div>
          <div className="my-2">
            <Label className="font-medium text-gray-700">Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={onChangeEventHandler}
              placeholder="example@gmail.com"
            />
          </div>
          <div className="my-2">
            
            <Label className="font-medium text-gray-700">Phone Number</Label>
            <Input
              type="tel"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={onChangeEventHandler}
              placeholder="enter phone number"
            />
          </div>
          <div className="my-2">
            <Label className="font-medium text-gray-700">Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={onChangeEventHandler}
              placeholder="enter Password"
            />
          </div>
          <div className="flex flex-col">
            <RadioGroup
              defaultValue="comfortable"
              className="flex items-center gap-4 my-4 "
            >
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={onChangeEventHandler}
                  className="cursor-pointer"
                />
                <Label className="font-medium text-gray-700" htmlFor="r1">student</Label>
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
                <Label className="font-medium text-gray-700" htmlFor="r2">recruiter</Label>
              </div>
            </RadioGroup>
            <div className=" cursor-pointer flex items-center">
              <Label className="font-medium text-gray-700">profile image</Label>
              <Input
                className="w-24 cursor-pointer"
                accept="image/*"
                type="file"
                name="file"
                onChange={onChangeFileHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-2">
              Sign up
            </Button>
          )}
          <span className="text-sm">
            already have an account ?
            <Link className="text-blue-600" to="/login">
              login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
