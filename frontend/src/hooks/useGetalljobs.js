import { setAlljobs } from '@/redux/jobslice';
import { JOB_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const useGetalljobs = () => {
    const dispatch = useDispatch();
    const searchedquerrytext = useSelector(store=>store.job.searchedQuerry);
    // console.log(searchedquerrytext);
    useEffect(()=>{
        const fetchalljobs = async ()=>{        
        try {
            const res = await axios.get(`${JOB_END_POINT}/getjobs?keyword=${searchedquerrytext || ""}`,{withCredentials:true});
            if(res.data.success){
                // console.log(res.data.jobs);
                dispatch(setAlljobs(res.data.jobs));
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message || "an error occured usegetalljobs" );
        }
    }
    fetchalljobs();
   
  },[searchedquerrytext])
}

export default useGetalljobs;
