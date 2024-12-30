import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { LogOut, Menu, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authslice";

const Navbar = () => {
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-white border-b shadow-md">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto h-16 px-4">
        
        <h1 className="text-2xl font-bold text-[#6A38C2]">
          jobJunction <span className="text-[#F83802]">.com</span>
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6">
            {user && user?.role === "recruiter" ? (
              <>
                <Link to="/admin/companies">Companies</Link>
                <Link to="/admin/jobs">Jobs</Link>
              </>
            ) : (
              <>
                <Link to="/">Home</Link>
                <Link to="/jobs">Jobs</Link>
                <Link to="/browse">Browse</Link>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact Us</Link>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#542a9c]">Sign up</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile?.profilephoto ||
                      "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
                    }
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-5">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={
                        user?.profile?.profilephoto ||
                        "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
                      }
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-3">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="flex flex-col items-start mt-2">
                  {user && user.role === "student" && (
                    <div className="flex items-center">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Menu className="cursor-pointer h-6 w-6 text-gray-600" />
            </PopoverTrigger>
            <PopoverContent className="w-36 p-4">
              <ul className="flex flex-col items-center space-y-4">
                {user && user?.role === "recruiter" ? (
                  <>
                    <Link to="/admin/companies">Companies</Link>
                    <Link to="/admin/jobs">Jobs</Link>
                  </>
                ) : (
                  <>
                    <Link to="/">Home</Link>
                    <Link to="/jobs">Jobs</Link>
                    <Link to="/browse">Browse</Link>
                  </>
                )}
                {!user ? (
                  <>
                    <Link to="/login">
                      <Button variant="outline">Login</Button>
                    </Link>
                    <Link to="/signup">
                      <Button className="bg-[#6A38C2] hover:bg-[#542a9c]">Sign up</Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/profile">View profile</Link>
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </>
                )}
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
