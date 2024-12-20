import { setSingleCompany } from "@/redux/companyslice";
import { COMPANY_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner";


const useGetcompanyById = (companyId) => {
    const dispatch = useDispatch();
  useEffect(()=>{
    const fetchSingleCompany = async ()=>{
        try {
            const res = await axios.get(`${COMPANY_END_POINT}/get/${companyId}`,{
                withCredentials:true
            });
            if(res.data.success){
                dispatch(setSingleCompany(res.data.company));
            }
        } catch (error) {
            console.log(error);
            toast(error.response.data.message);
        }
    }
    fetchSingleCompany();
  },[companyId,dispatch])
}

export default useGetcompanyById;
