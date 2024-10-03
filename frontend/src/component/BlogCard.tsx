import { useNavigate } from 'react-router';
import Avatar from './Avatar'; // Ensure this path is correct
import { AiOutlineLike, AiOutlineEdit, AiOutlineSave } from 'react-icons/ai';
import ThemeFunction from '../context/ThemeContext';

interface BlogCardContent {
  author: string;
  publishedDate: string;
  title: string;
  content: string;
  id: number;
}

const BlogCard = ({ author, publishedDate, title, content, id }: BlogCardContent) => {
  const {DarkTheme} = ThemeFunction()
  const navigate = useNavigate();

  // Function to truncate content to 40 words
  const truncateContent = (text: string, wordLimit: number) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  // Function to calculate read time
  const calculateReadTime = (text: string) => {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = text.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime;
  };

  const handleReadMore = (e: any) => {
    e.preventDefault();
    navigate(`/${id}`);
  };

  const truncatedContent = truncateContent(content, 40);
  const readTime = calculateReadTime(content);

  return (
    <div
      className={`max-w-4xl mx-auto ${
        DarkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      } rounded-xl shadow-lg overflow-hidden m-4 transform hover:scale-105 transition-transform duration-300`}
    >
      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Avatar name={author} size={3} />
            <div className="ml-4 text-sm">
              <span className="font-semibold">{author}</span>
              <span className="mx-1">•</span>
              <span>{new Date(publishedDate).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Icons */}
          <div className="flex space-x-4">
            <AiOutlineEdit
              className={`${
                DarkTheme ? "text-gray-300 hover:text-blue-400" : "text-gray-500 hover:text-blue-600"
              } transition duration-300 transform hover:scale-125 cursor-pointer`}
              size={24}
            />
            <AiOutlineLike
              className={`${
                DarkTheme ? "text-gray-300 hover:text-red-400" : "text-gray-500 hover:text-red-600"
              } transition duration-300 transform hover:scale-125 cursor-pointer`}
              size={24}
            />
            <AiOutlineSave
              className={`${
                DarkTheme ? "text-gray-300 hover:text-green-400" : "text-gray-500 hover:text-green-600"
              } transition duration-300 transform hover:scale-125 cursor-pointer`}
              size={24}
            />
          </div>
        </div>

        <a
          href="#"
          onClick={handleReadMore}
          className={`block mt-1 text-2xl leading-tight font-bold ${
            DarkTheme ? "text-white" : "text-gray-900"
          } hover:underline`}
        >
          {title}
        </a>
        <p className={`mt-4 ${DarkTheme ? "text-gray-400" : "text-gray-600"}`}>
          {truncatedContent}
        </p>
        <button
          onClick={handleReadMore}
          className={`mt-4 ${
            DarkTheme ? "text-blue-400 hover:text-blue-600" : "text-blue-600 hover:text-blue-800"
          } font-semibold transition-colors duration-300`}
        >
          Read More
        </button>
        <div className={`mt-4 text-sm ${DarkTheme ? "text-gray-500" : "text-gray-500"}`}>
          {readTime} min read
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
