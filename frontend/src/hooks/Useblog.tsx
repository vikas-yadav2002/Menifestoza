import axios from 'axios';
import {useState , useEffect} from 'react'
import { BACKEND_URL } from '../config';

interface Blog{
    "content": string,
   "title": string,
   "id" :  string
   "author": {
    "name": string
}

}

const Useblog = ({id} : {id : string}) => {
   const [loading , setloading]= useState(true);
   const [blog , setblog]= useState<Blog>();

   useEffect(()=>{
   axios.get(`${BACKEND_URL}api/v1/blog/Find/${id}` , {
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
    }
   }).then((response)=>{
     console.log(response.data.blog)
       setblog(response.data.blog)
       setloading(false)
   })
   } , [])


  return{
    loading,
    blog
  }
}

export default Useblog
