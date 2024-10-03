import { SignupInput } from '@100xdevs/medium-common'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../config.ts'

const SignUp = () => {
  const navigate = useNavigate();
  const [Inputs , setInputs] = useState<SignupInput>({
   username : "",
   password : "",
   name :  ""
  })

  const sendRequest = async (e:any)=>{
    e.preventDefault()
    try{
        const response = await axios.post(`${BACKEND_URL}api/v1/user/signup` , Inputs)
        const token = response.data;
        localStorage.setItem("token", token.token);
        alert("user successfully created");

        console.log(token.token)
        navigate('/blogs')
    }
    catch(e){
        console.log(e)
        console.log(Inputs)
        alert("error while creating user")
    }


  }



  return (
    <>
   
    <div>
      
     <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-background">
          <div className="md:w-1/2 p-4">
            <img src= "../../public/img/signup-transformed.jpeg" alt="Illustration of a person working on a computer" className="w-full h-auto"/>
          </div>
          <div className="md:w-1/2 p-8 bg-card rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-4">Become a New Member</h2>
            <p className="text-muted-foreground mb-6">Already have an Account ? <Link to="/signin" className='underline-offset-2'> Sign In </Link> </p>
            <form className="space-y-4">
              <div>
                <label htmlFor="full-name" className="block text-sm font-medium text-foreground">Full Name</label>
                <input id="full-name" type="text" className="mt-1 block w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Enter Your Name" onChange={(e)=>{
                    setInputs({...Inputs , name : e.target.value})
                }}/>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
                <input id="email" type="email" className="mt-1 block w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Enter Your Email Here That Will Be Your Username" onChange={(e)=>{
                    setInputs({...Inputs , username  : e.target.value})
                }}/>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground">Password</label>
                <input id="password" type="password" className="mt-1 block w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Enter Your Password Here" onChange={(e)=>{
                    setInputs({...Inputs , password : e.target.value})
                }}/>
              </div>
             
              <div>
                <button type="submit" className="w-full py-2 px-4 bg-neutral-950 text-white rounded-md shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" onClick={sendRequest}>Sign up</button>
              </div>
            </form>
          </div>
        </div>
    </div>
    </>
  )
}

export default SignUp
