import { setAllAdminjobs } from "@/redux/jobslice";
import { JOB_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminjobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminjobs = async () => {
      try {
        const res = await axios.get(`${JOB_END_POINT}/getjobsbycreator`, {
          withCredentials: true,
        });
        if (res.data.success) {
          // console.log(res.data.jobs);
          dispatch(setAllAdminjobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAdminjobs();
  }, []);
};

export default useGetAllAdminjobs;
