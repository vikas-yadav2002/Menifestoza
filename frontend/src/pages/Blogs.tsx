// import { useEffect } from "react";
import BlogCard from "../component/BlogCard";
import BlogsSkeleton from "../component/BlogsSkeleton";
import NavBar from "../component/Navbar";
import ThemeFunction from "../context/ThemeContext";
import Useblogs from "../hooks/Useblogs";
// import useUser from "../hooks/Useuser";
// import { useNavigate } from "react-router";

const Blogs = () => {
  // const { user, loading: userLoading } = useUser();
  const { blogs, loading: blogsLoading } = Useblogs();
  const { DarkTheme } = ThemeFunction();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("User loading:", userLoading);
  //   console.log("User data:", user);
  
  //   if (!userLoading && !user) {
  //     alert("Sign in to view blogs");
  //     navigate("/signin");
  //   } implement the redirecting process
  // }, [user, userLoading, navigate]);
  

  const renderBlogs = () => {
    if (blogsLoading) {
      return (
        <>
          <BlogsSkeleton />
          <BlogsSkeleton />
          <BlogsSkeleton />
          <BlogsSkeleton />
          <BlogsSkeleton />
        </>
      );
    }

    return blogs.map((blog) => (
      <BlogCard
        key={blog.id?.toString()}
        author={blog.author.name || "Anonymous"}
        title={blog.title}
        content={blog.content}
        publishedDate="03/04/2023"
        id={blog.id}
      />
    ));
  };

  return (
    <div className={`${DarkTheme ? "bg-gray-700 text-white" : "bg-gray-100 text-black"}`}>
      <NavBar />
      <div className="container mx-auto p-4">
        {renderBlogs()}
      </div>
    </div>
  );
};

export default Blogs;
