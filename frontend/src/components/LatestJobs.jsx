import React from 'react'
import LatestJobCard from './LatestJobCard';
import { useSelector } from 'react-redux';

// const randomJobs = [1,2,3,4,5,6,7,8];
const LatestJobs = () => {
  const {alljobs} = useSelector(store=>store.job);
  const latestJobs = [...alljobs]?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  // console.log(alljobs);
  return (
    <div className='  max-w-5xl mx-auto mt-6'>
      <h1 className='text-3xl sm:text-4xl md:text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span>Job Openings</h1>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5'>
      {
          latestJobs?.length<=0?<span>No job available</span>:  latestJobs?.slice(0,6).map((job)=>{
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
