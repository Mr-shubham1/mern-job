import React from 'react'
import Navbar from '../shared/Navbar'
import ApplicationTable from './ApplicationTable'
import { useSelector } from 'react-redux'

const Applicants = () => {
    const applications = useSelector(store=>store.application.applicants);
    // console.log(applications);/
  return (
    <div>
        <Navbar/>
        <div className='max-w-5xl mx-auto mt-6'>
            <h1 className='text-xl font-bold my-2'>Applicants ({applications?.length})</h1>
            <ApplicationTable/>
        </div>
    </div>
  )
}

export default Applicants
