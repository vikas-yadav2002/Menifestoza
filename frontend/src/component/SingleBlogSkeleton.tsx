import ThemeFunction from '../context/ThemeContext';

const SingleBlogSkeleton = () => {
  const { DarkTheme } = ThemeFunction();

  return (
    <div>
      <div className="max-w-6xl mx-auto p-6 min-w-full min-h-[100vh]">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side: Blog content skeleton */}
          <div className="md:w-2/3">
            <div
              className={`h-10 rounded-md animate-pulse mb-4 w-3/4 ${
                DarkTheme ? 'bg-gray-700' : 'bg-gray-300'
              }`}
            ></div>
            <div
              className={`h-6 rounded-md animate-pulse mb-6 w-1/3 ${
                DarkTheme ? 'bg-gray-700' : 'bg-gray-300'
              }`}
            ></div>
            <div className="prose max-w-none">
              <div
                className={`h-6 rounded-md animate-pulse mb-4 ${
                  DarkTheme ? 'bg-gray-700' : 'bg-gray-300'
                }`}
              ></div>
              <div
                className={`h-6 rounded-md animate-pulse mb-4 w-5/6 ${
                  DarkTheme ? 'bg-gray-700' : 'bg-gray-300'
                }`}
              ></div>
              <div
                className={`h-6 rounded-md animate-pulse mb-4 ${
                  DarkTheme ? 'bg-gray-700' : 'bg-gray-300'
                }`}
              ></div>
              <div
                className={`h-6 rounded-md animate-pulse mb-4 w-3/4 ${
                  DarkTheme ? 'bg-gray-700' : 'bg-gray-300'
                }`}
              ></div>
            </div>
          </div>

          {/* Right side: Author info skeleton */}
          <div className="md:w-1/3">
            <div className="sticky top-4">
              <div
                className={`p-6 rounded-lg ${
                  DarkTheme ? 'bg-gray-800' : 'bg-gray-100'
                }`}
              >
                <div
                  className={`h-6 rounded-md animate-pulse mb-4 w-1/2 ${
                    DarkTheme ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                ></div>
                <div className="flex items-center mb-2">
                  <div
                    className={`w-8 h-8 rounded-full animate-pulse mr-2 ${
                      DarkTheme ? 'bg-gray-700' : 'bg-gray-300'
                    }`}
                  ></div>
                  <div
                    className={`h-5 rounded-md animate-pulse w-1/2 ${
                      DarkTheme ? 'bg-gray-700' : 'bg-gray-300'
                    }`}
                  ></div>
                </div>
                <div
                  className={`h-4 rounded-md animate-pulse mt-2 w-full ${
                    DarkTheme ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogSkeleton;
