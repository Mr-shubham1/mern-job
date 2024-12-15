import React from 'react'
import LatestJobCard from './LatestJobCard';
import { useSelector } from 'react-redux';

// const randomJobs = [1,2,3,4,5,6,7,8];
const LatestJobs = () => {
  const {alljobs} = useSelector(store=>store.job);
  // console.log(alljobs);
  return (
    <div className='  max-w-5xl mx-auto mt-6'>
      <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span>Job Openings</h1>
      {/* cards bellow */}
      <div className='grid grid-cols-3 gap-4 my-5'>
      {
          alljobs?.length<=0?<span>No job available</span>:  alljobs?.slice(0,6).map((job)=>{
            return (
                <LatestJobCard key={job._id} job={job}/>
            )
        })
      }
      </div>
    </div>
  )
}

export default LatestJobs;
