import React from 'react';
import ThemeFunction from '../context/ThemeContext';


interface ProfileProps {
    username: string;
    bio?: string;
    profileImage?: string;
    followers?: number;
    following?: number;
    posts?: number;
}

const ProfileCard: React.FC<ProfileProps> = ({ 
    username, 
    bio = "Passionate blogger and storyteller, sharing insights on tech, creativity, and personal growth. Always exploring new ideas, aiming to inspire and connect with like-minded readers. Let’s journey through thoughts, experiences, and discoveries together.", 
    followers = 22, 
    profileImage = '../../public/img/profile.png',
    following = 20, 
    posts = 10 
}) => {
    const { DarkTheme } = ThemeFunction();

    return (
        <div className={`max-w-3xl mx-auto mt-10 p-6 shadow-lg rounded-lg transition-colors duration-300 ${
            DarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        }`}>
            {/* Profile Image and Header */}
            <div className="flex flex-col items-center text-center">
                {/* Profile image (optional) */}
                {profileImage && (
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
                    />
                )}
                
                <h1 className="mt-4 text-2xl font-semibold">{username}</h1>
                <p className={`${DarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>{bio}</p>
            </div>

            {/* Stats Section */}
            <div className="flex justify-center mt-6 space-x-8 text-center">
                <div>
                    <span className="text-xl font-bold">{posts}</span>
                    <p className={`${DarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>Posts</p>
                </div>
                <div>
                    <span className="text-xl font-bold">{followers}</span>
                    <p className={`${DarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>Followers</p>
                </div>
                <div>
                    <span className="text-xl font-bold">{following}</span>
                    <p className={`${DarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>Following</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-center space-x-4">
                <button className={`px-4 py-2 rounded-md transition ${
                    DarkTheme ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}>
                    Follow
                </button>
                <button className={`px-4 py-2 rounded-md transition ${
                    DarkTheme ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}>
                    Message
                </button>
            </div>

            {/* About Section */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-2">About</h2>
                <p className={`${DarkTheme ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                    {bio}
                </p>
            </div>

            {/* User's Blog Posts or Recent Activity */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Recent Posts</h2>
                <div className="space-y-4">
                    <div className={`p-4 rounded-lg shadow-sm transition ${
                        DarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                    }`}>
                        <h3 className="font-semibold">Post Title 1</h3>
                        <p>This is a short description of the post...</p>
                    </div>
                    <div className={`p-4 rounded-lg shadow-sm transition ${
                        DarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                    }`}>
                        <h3 className="font-semibold">Post Title 2</h3>
                        <p>This is a short description of the post...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
