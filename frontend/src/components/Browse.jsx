import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuerry } from "@/redux/jobslice";
import useGetalljobs from "@/hooks/useGetalljobs";


// const randomJobs = [1,2,3,4,5,6,7,8,9];
const Browse = () => {
  useGetalljobs();
  const alljobs = useSelector(store=>store.job.alljobs);
  const dispatch = useDispatch();
  useEffect(()=>{
    // console.log("browse mounted");
    return ()=>{
      // console.log("browse Unmounted");
      dispatch(setSearchedQuerry(""));
    }
  },[])

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto my-5">
        <h1 className="font-bold text-xl mt-5 ">Search resulrs {alljobs.length}</h1>
        <div className="flex gap-4 flex-wrap mt-5 items-center justify-center">
          {alljobs.map((job) => {
            return <Job key={job._id} job={job}/>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
