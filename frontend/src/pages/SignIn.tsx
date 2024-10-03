import { SigninInput } from '@100xdevs/medium-common'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../config.ts'
import Spinner from '../component/Spinner.tsx'

const SignIn = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<SigninInput>({
    username: "",
    password: "",
  })

  const sendRequest = async (e: any) => {
    e.preventDefault()
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}api/v1/user/signin`, inputs)
      const token = response.data;
      localStorage.setItem("token", token.token);
      alert("Signed in successfully");
      setLoading(false);
      navigate('/blogs')
    } catch (e) {
      console.log(e)
      console.log(inputs)
      alert("Error while signing in")
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-background dark:bg-gray-900">
        <div className="md:w-1/2 p-4">
          <img src="../../public/img/signin.jpg" alt="Illustration of a person working on a computer" className="w-full h-auto" />
        </div>
        <div className="md:w-1/2 p-8 bg-card dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-foreground dark:text-gray-100 mb-4">Welcome Back</h2>
          <p className="text-muted-foreground dark:text-gray-400 mb-6">
            Don't have an account? <Link to="/signup" className='underline-offset-2 text-primary dark:text-blue-400'>Sign Up</Link>
          </p>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground dark:text-gray-200">Email</label>
              <input
                id="email"
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-input dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-gray-200"
                placeholder="Enter your email"
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground dark:text-gray-200">Password</label>
              <input
                id="password"
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-input dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-gray-200"
                placeholder="Enter your password"
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              />
            </div>
            <div>
              <button
                type="submit"
                className={`w-full py-2 px-4 bg-neutral-950 dark:bg-blue-600 text-white rounded-md shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-900 transition-all duration-300 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                onClick={sendRequest}
              >
                {loading ? <Spinner /> : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignIn
