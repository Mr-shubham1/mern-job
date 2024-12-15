import React from 'react'
import Navbar from './shared/Navbar';
import CardFilter from './CardFilter';
import Job from './Job';
import { useSelector } from 'react-redux';


const jobsArray = [1,2,3,4,5,6,7,8];
const Jobs = () => {
  const {alljobs} = useSelector(store=>store.job);
  return (
    <div>
      <Navbar/>
      <div className=' flex gap-8 max-w-5xl mx-auto mt-5'>
        <div className='w-[20%]'>
          <CardFilter/>
        </div>
        <div className='w-[80%]  flex flex-wrap gap-2 h-[85vh] overflow-y-auto'>
          {
            alljobs?.length<=0?<span>No jobs Available</span>: alljobs?.map((job)=>{
               return (
                <Job key={job._id} job={job}/>
               )
            })
          }
        </div>
      </div>
      
     
    </div>
  )
}

export default Jobs;
