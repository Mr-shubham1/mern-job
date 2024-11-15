import React from 'react'
import Navbar from './shared/Navbar';
import CardFilter from './CardFilter';
import Job from './Job';

const jobsArray = [1,2,3,4,5,6,7,8];
const Jobs = () => {
  return (
    <div>
      <Navbar/>
      <div className=' flex gap-8 max-w-5xl mx-auto mt-5'>
        <div className='w-[20%]'>
          <CardFilter/>
        </div>
        <div className='w-[80%]  flex flex-wrap gap-2 h-[85vh] overflow-y-auto'>
          {
            jobsArray.map((item,index)=>{
               return (
                <Job/>
               )
            })
          }
        </div>
      </div>
     
    </div>
  )
}

export default Jobs;
