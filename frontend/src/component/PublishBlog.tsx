import { CreateBlogInput } from '@100xdevs/medium-common';
import axios from 'axios';
import { useState } from 'react';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router';
import Spinner from './Spinner';
import ThemeFunction from '../context/ThemeContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PublishBlog: React.FC = () => {
 
  const { DarkTheme } = ThemeFunction();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [blogInputs, setBlogInputs] = useState<CreateBlogInput>({
    title: '',
    content: ''
  });

  const token = localStorage.getItem('token');
  if (!token) {
    alert('Access Denied');
    navigate('/signin');
  }

  const Headers = {
    'Authorization': `Bearer ${token}`
  };

  const handlePublish = async () => {
    setLoading(true);
   
    try {
      const response = await axios.post(`${BACKEND_URL}api/v1/blog/create`, blogInputs, {
        headers: Headers
      });
      const data = response.data;
      setLoading(false);

      if (data.message === "Error while creating blog") {
        navigate('/signin');
      } 
      else if (data.message === "please fill all the inputs") {
        alert("Please fill all fields");
          setLoading(false);
          return;
      }else {
        setBlogInputs({ title: '', content: '' });
        navigate(`/${data.blogId}`);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error publishing blog:", error);
    }
  };

  return (
    <div
      className={`flex flex-col items-center min-h-screen ${
        DarkTheme ? 'bg-gray-700' : 'bg-gray-100'
      }`}
    >
      <div
        className={`w-full max-w-4xl ${
          DarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        } shadow-lg rounded-lg mt-10 p-8 transform transition-transform duration-500 `}
      >
        <h1
          className={`text-3xl font-bold mb-6 text-center ${
            DarkTheme ? 'text-white' : 'text-gray-800'
          }`}
        >
          Publish Your Blog
        </h1>
        <input
          type="text"
          placeholder="Title goes here"
          value={blogInputs.title}
          onChange={(e) =>
            setBlogInputs({ ...blogInputs, title: e.target.value })
          }
          className={`w-full text-2xl font-semibold mb-6 p-3 border-b-2 ${
            DarkTheme
              ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-400'
              : 'bg-white text-gray-800 border-gray-300 focus:border-blue-500'
          } focus:outline-none transition-all duration-300`}
        />
       
        <ReactQuill
        className={`w-full h-64 text-lg p-3 mb-10 ${
          DarkTheme
            ? 'bg-gray-800 text-white  '
            : 'bg-white text-gray-800 border-gray-300 '
        } `}
              theme="snow"
                  value={blogInputs.content}  // Only pass content here
                   onChange={(content) => setBlogInputs({ ...blogInputs, content })} // Handle change directly
                                 placeholder="Content goes here"
                       />

        <button
          onClick={handlePublish}
          className={`mt-6 w-full ${
            loading
              ? 'cursor-not-allowed'
              : 'cursor-pointer hover:bg-blue-600 transform'
          } ${
            DarkTheme
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-blue-500 text-white shadow-md hover:bg-blue-600'
          } font-bold py-3 rounded-lg transition-all duration-300`}
        >
          {loading ? <Spinner /> : 'Publish Blog'}

         
        </button>
        
      </div>
    </div>
  );
};

export default PublishBlog;
