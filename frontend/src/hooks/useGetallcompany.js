import { setAllCompany } from "@/redux/companyslice"
import { COMPANY_END_POINT } from "@/utils/constant"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner"


const useGetallcompany = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
    const fetchallcompany = async ()=>{
        try {
            const res = await axios.get(`${COMPANY_END_POINT}/get`,{
                withCredentials:true
            });
            if(res.data.success){
                // console.log(res.data);
                dispatch(setAllCompany(res.data.companies));
                // toast(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast(error.response.data.message);
        }
    }
    fetchallcompany();
  },[])
}

export default useGetallcompany;
