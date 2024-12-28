import React from 'react'
import Navbar from './shared/Navbar';
import CardFilter from './CardFilter';
import Job from './Job';
import { useSelector } from 'react-redux';
import Footer from './Footer';


const jobsArray = [1,2,3,4,5,6,7,8];
const Jobs = () => {
  const {alljobs} = useSelector(store=>store.job);
  return (
    <div>
      <Navbar/>
      <div className='flex flex-col  md:flex-row gap-8 max-w-5xl mx-auto mt-5 px-4'>
        <div className='w-full md:w-[20%]'>
          <CardFilter/>
        </div>
        <div className='w-full md:w-[80%] flex flex-wrap items-center justify-center gap-4 h-[85vh] overflow-y-auto'>
          {
            alljobs?.length<=0?<span>No jobs Available</span>: alljobs?.map((job)=>{
               return (
                <Job key={job._id} job={job}/>
               )
            })
          }
        </div>
      </div>
      <Footer/>
      
     
    </div>
  )
}

export default Jobs;
