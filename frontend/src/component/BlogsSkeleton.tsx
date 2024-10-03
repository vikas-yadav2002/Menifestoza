import ThemeFunction from "../context/ThemeContext";

const BlogsSkeleton = () => {
  const { DarkTheme } = ThemeFunction();

  return (
    <div>
      <div
        className={`max-w-4xl mx-auto ${
          DarkTheme ? "bg-gray-800" : "bg-white"
        } rounded-xl shadow-md overflow-hidden m-4`}
      >
        <div className="p-8">
          <div className="flex items-center mb-4">
            <div
              className={`w-10 h-10 ${
                DarkTheme ? "bg-gray-600" : "bg-gray-300"
              } rounded-full animate-pulse`}
            ></div>
            <div className="ml-4">
              <div
                className={`w-24 h-4 ${
                  DarkTheme ? "bg-gray-600" : "bg-gray-300"
                } rounded animate-pulse mb-1`}
              ></div>
              <div
                className={`w-16 h-4 ${
                  DarkTheme ? "bg-gray-600" : "bg-gray-300"
                } rounded animate-pulse`}
              ></div>
            </div>
          </div>
          <div className="block mt-1">
            <div
              className={`w-full h-6 ${
                DarkTheme ? "bg-gray-600" : "bg-gray-300"
              } rounded animate-pulse mb-2`}
            ></div>
            <div
              className={`w-2/3 h-6 ${
                DarkTheme ? "bg-gray-600" : "bg-gray-300"
              } rounded animate-pulse`}
            ></div>
          </div>
          <div className="mt-2">
            <div
              className={`w-full h-4 ${
                DarkTheme ? "bg-gray-600" : "bg-gray-300"
              } rounded animate-pulse mb-1`}
            ></div>
            <div
              className={`w-5/6 h-4 ${
                DarkTheme ? "bg-gray-600" : "bg-gray-300"
              } rounded animate-pulse mb-1`}
            ></div>
            <div
              className={`w-4/5 h-4 ${
                DarkTheme ? "bg-gray-600" : "bg-gray-300"
              } rounded animate-pulse`}
            ></div>
          </div>
          <div className="mt-4">
            <div
              className={`w-20 h-4 ${
                DarkTheme ? "bg-gray-600" : "bg-gray-300"
              } rounded animate-pulse`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsSkeleton;
