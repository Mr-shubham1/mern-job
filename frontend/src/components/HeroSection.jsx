import React from 'react'
import { Button } from './ui/button';
import { Search } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-5'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002]'>No. 1 Job hunt Website</span>
        <h1 className='text-5xl font-bold'>Search Apply & <br/> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
        <p>Find opportunities that match your skills and ambitions.<br/> With personalized recommendations and expert guidance, landing your dream job is just a click away!</p>
        <div className='flex w-[40%] border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto shadow-lg'>
          <input type="text" placeholder='Find Your Dream Jobs' className='border-none outline-none w-full'  />
          <Button className="rounded-r-full bg-[#6A38C2]"><Search className='h-5 w-5'/></Button>
        </div>
        </div>   
    </div>
  )
}
export default HeroSection;
