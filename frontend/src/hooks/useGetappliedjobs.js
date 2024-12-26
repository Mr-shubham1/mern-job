import { setAppliedjobs } from "@/redux/jobslice";
import { APPLICATIO_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetappliedjobs = () => {
    const dispatch = useDispatch();
    console.log("hello");
    
  useEffect(() => {
    const fetchallappliedjobs = async () => {
      try {
        const res = await axios.get(`${APPLICATIO_END_POINT}/get`, {
          withCredentials: true,
        });
        if(res.data.success){
            // console.log(res.data.applications);
            dispatch(setAppliedjobs(res.data.applications));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchallappliedjobs();
  }, []);
};

export default useGetappliedjobs;
