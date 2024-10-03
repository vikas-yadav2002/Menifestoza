import axios from 'axios';
import {useState , useEffect} from 'react'
import { BACKEND_URL } from '../config';

interface Blogs{
    "content": string,
   "title": string,
   "id" : number
   "author": {
    "name": string
}

}

const Useblogs = () => {
   const [loading , setloading]= useState(true);
   const [blogs , setblogs]= useState<Blogs[]>([]);

   useEffect(()=>{
   axios.get(`${BACKEND_URL}api/v1/blog/bulk` , {
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
    }
   }).then((response)=>{
     
       setblogs(response.data.blog)
       setloading(false)
   })
   } , [])


  return{
    loading,
    blogs
  }
}

export default Useblogs
