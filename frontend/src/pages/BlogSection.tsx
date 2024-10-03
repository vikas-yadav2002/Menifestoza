import Avatar from '../component/Avatar.tsx'; // Ensure this path is correct
import ThemeFunction from '../context/ThemeContext'; // Import the theme context

interface BlogDetails {
  title: string;
  content: string;
  name: string;
}

const BlogSection = ({ title, content, name }: BlogDetails) => {
  const { DarkTheme } = ThemeFunction(); // Access dark theme state

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side: Blog content */}
        <div className="md:w-2/3">
          <h1
            className={`text-5xl font-bold mb-4 leading-tight transition-colors duration-300 ${
              DarkTheme ? 'text-gray-100 hover:text-yellow-300' : 'text-gray-900 hover:text-yellow-500'
            }`}
          >
            {title}
          </h1>
          <p className={`mb-6 italic ${DarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
            Published on {new Date(22 / 3 / 2024).toLocaleDateString()}
          </p>
          <div className={`prose max-w-none text-xl font-semibold leading-relaxed ${DarkTheme ? 'text-gray-300' : 'text-slate-800'}`}>
            {content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Right side: Author info */}
        <div className="md:w-1/3">
          <div className="sticky top-4">
            <div
              className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${
                DarkTheme
                  ? 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700'
                  : 'bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100'
              }`}
            >
              <h2 className={`text-xl font-semibold mb-4 ${DarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>
                About the Author
              </h2>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12">
                  <Avatar name={name} size={4} />
                </div>
                <div className="ml-3">
                  <h3 className={`font-semibold text-lg ${DarkTheme ? 'text-gray-100' : 'text-gray-900'}`}>{name}</h3>
                </div>
              </div>
              <p className={`text-center mt-2 ${DarkTheme ? 'text-gray-400' : 'text-gray-700'}`}>
                Author description goes here. Add a brief bio or details about the author to engage readers.
              </p>
              <div className="mt-4 flex justify-center">
                <button
                  className={`py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 font-bold ${
                    DarkTheme ? 'bg-blue-600 hover:bg-blue-700 text-gray-100' : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  Follow {name}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
