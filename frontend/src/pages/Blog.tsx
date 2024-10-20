import { useParams } from "react-router"
import NavBar from "../component/Navbar"
import Useblog from "../hooks/Useblog"
import BlogSection from "./BlogSection"
import SingleBlogSkeleton from "../component/SingleBlogSkeleton"
import ThemeFunction from "../context/ThemeContext"



const Blog = () => {

  const { DarkTheme } = ThemeFunction();
  const {id} = useParams()
  const { loading , blog } = Useblog({
    id : id || ""
  })

  const renderBlogss = () => {
    if (loading) {
      
      return (
     <SingleBlogSkeleton/>
      )
     
    }else{
     
      return (
        <BlogSection title={blog?.title || ""} content={blog?.content || ""} name={blog?.author.name|| "anonymous"} />


      );
    }

    
  };



  return (
    <div className={`${DarkTheme ? "bg-gray-700 text-white" : "bg-gray-100 text-black"}`}>
    <NavBar />
    {renderBlogss()}
  </div>
  )
}

export default Blog
