import { setAlljobs } from '@/redux/jobslice';
import { JOB_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const useGetalljobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchalljobs = async ()=>{        
        try {
            const res = await axios.get(`${JOB_END_POINT}/getjobs`,{withCredentials:true});
            if(res.data.success){
                dispatch(setAlljobs(res.data.jobs));
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message || "an error occured usegetalljobs" );
        }
    }
    fetchalljobs();
   
  },[])
}

export default useGetalljobs;
