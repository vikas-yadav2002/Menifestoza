import  { useEffect } from 'react';
import { useNavigate } from 'react-router';
import ProfileCard from '../component/Profile';
import NavBar from '../component/Navbar';
import ThemeFunction from '../context/ThemeContext';

const ProfilePage = () => {
    const navigate = useNavigate();
    const { DarkTheme } = ThemeFunction();
    const username = localStorage.getItem('username');

    useEffect(() => {
        if (!username) {
            alert('User not available');
            navigate('/signin');
        }
    }, [username, navigate]); // Add username and navigate as dependencies

    return (
        <div className={`min-h-screen transition-colors duration-300 ${DarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
            <NavBar />
            {username && (
                <ProfileCard username={username} />
            )}
        </div>
    );
};

export default ProfilePage;
