import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

// Create a context for user data
export const UserContext = createContext({
  user: null,
  fetchUserData: () => {},
  loading: true,
});

// Function to use the context
export const useUser = () => useContext(UserContext);

// Function to handle fetching user data and storing it in context/localStorage
export const UserFunction = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user data from backend
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get(`${BACKEND_URL}/api/v1/user/detail`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedUser = localStorage.getItem('user');
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
      setLoading(false);
    } else {
      fetchUserData();
    }
  }, []);

  // Return the user and the fetch function, so it can be accessed anywhere
  return {
    user,
    loading,
    fetchUserData,
  };
};

// Export the context value to be used in the app
export const UserProvider = UserContext.Provider;
