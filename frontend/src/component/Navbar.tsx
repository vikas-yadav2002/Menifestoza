import {useEffect, useState, } from 'react';
import {TfiWrite} from "react-icons/tfi";
import {BsSun, BsMoon, BsList} from "react-icons/bs";
import {Link, useNavigate} from 'react-router-dom'; // Use useNavigate instead of redirect
import Avatar from './Avatar'; // Ensure this path is correct
import manifestoza from '../../public/img/Manifesto2.png';
import useUser from '../hooks/Useuser';
import ThemeFunction from '../context/ThemeContext';
// import Spinner from './Spinner';

const NavBar = () => {
  const [username  , setUsername] =  useState("");
    const {DarkTheme, changeTheme} = ThemeFunction();
    const {user, loading} = useUser(); // Type can be inferred
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate(); // Initialize useNavigate

   useEffect(()=>{
    if(!user && !loading){
        navigate('/signin');
    }
    const localusername = localStorage.getItem('username');
    if(localusername){setUsername(localusername)}

   }, [])

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const handleLogout = async () => {

        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('user'); // Optional: Clear user data on logout

        navigate('/signin'); // Use navigate for redirection
    };


    return (
        <nav className={
            `p-2 shadow-md transition-colors duration-300 z-50 sticky top-0  ${
                DarkTheme ? 'bg-[#1F2937] text-white' : 'bg-[#EDEEF1] text-gray-900'
            }`
        }>
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to={'/blogs'}
                    className="text-3xl font-extrabold hover:text-gray-700 transition-colors duration-300">
                    <img src={manifestoza}
                        alt="Logo"
                        className="max-h-16"/>
                </Link>

                {/* Hamburger Menu for Small Screens */}
                <button onClick={toggleMenu}
                    className="md:hidden text-2xl">
                    <BsList/>
                </button>

                {/* Right Side: Avatar, Username, Icons */}
                <div className={
                    `flex items-center space-x-4 md:space-x-6 ${
                        isMenuOpen ? 'block' : 'hidden'
                    } md:flex`
                }>
                    {/* Avatar with hover effect */}
                    <div className="flex items-center space-x-2">
                        
                            

                          { /* todo : can take username from login and display here  */}
                                <Avatar name={username} size={4}/>


                                <span className="font-semibold text-lg hover:text-gray-700 cursor-pointer transition duration-300">
                                    { username.slice(0,4)}
                                    {/* Ensure user exists */} 
                                </span>
                     </div>


                    {/* Dark/Light Mode Toggle Icon */}
                    <button onClick={changeTheme}
                        className="text-2xl hover:text-gray-400 transition-transform duration-300 transform hover:scale-110">
                        {
                        DarkTheme ? <BsSun/>: <BsMoon/>
                    } </button>

                    {/* Animated Write Icon */}
                    <Link to={'/createblog'}>
                        <TfiWrite className={`text-2xl transition-transform duration-500 transform hover:rotate-12 hover:scale-110 hover:text-gray-700`}/>
                    </Link>

                    {/* Logout Button with hover and focus effects */}
                    <button className={
                            `font-bold py-2 px-5 rounded-full shadow-lg transition-all duration-500 transform hover:scale-105 ${
                                DarkTheme ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-900 hover:bg-gray-700 text-white'
                            }`
                        }
                        onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
