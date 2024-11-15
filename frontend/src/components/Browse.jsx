import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";

const randomJobs = [1,2,3,4,5,6,7,8,9];
const Browse = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto my-5">
        <h1 className="font-bold text-xl mt-5 ">Search resulrs {randomJobs.length}</h1>
        <div className="flex gap-4 flex-wrap mt-5 items-center justify-center">
          {randomJobs.map(() => {
            return <Job />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
