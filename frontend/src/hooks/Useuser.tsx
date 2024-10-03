import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";


const useUser = () => {
    const [user , setuser] = useState("");
    const token = localStorage.getItem('token');
  

  const Headers = {
    'Authorization': `Bearer ${token}`
  };
    const fn = async ()=>{
      const response = await axios.get(`${BACKEND_URL}api/v1/user/detail` , {
        headers : Headers,
      })
      setuser(response.data);
      return response.data;
    }

    useEffect(()=>{
       fn();
      
    ;
    } ,[]);
  return {
      user,
}
}

export default useUser
