import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

const useUser = () => {
  const [user, setUser] = useState(null); // Use null for uninitialized state
  const [loading, setLoading] = useState(true); // Add loading state
  const token = localStorage.getItem('token');

  const Headers = {
    'Authorization': `Bearer ${token}`,
  };

  const fn = async () => {
    const cachedData = localStorage.getItem("user");

    if (!cachedData) {
      try {
        // Add a delay of 2 seconds before making the API call to simulate loading
        // await new Promise(resolve => setTimeout(resolve, 5000));

        const response = await axios.get(`${BACKEND_URL}api/v1/user/detail`, {
          headers: Headers,
        });

        // Store user data in local storage
        localStorage.setItem("user", JSON.stringify(response.data.userFind)); 
        setUser(response.data.userFind);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null); // Handle error case
      }
    } else {
      // Add a delay of 2 seconds to simulate loading when retrieving from cache
      // await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Parse cached data back to an object
      setUser(JSON.parse(cachedData)); 
    }

    setLoading(false); // Set loading to false after fetching
  };

  useEffect(() => {
    fn();
  }, []);

  return {
    user,
    loading, // Return loading state
  };
};

export default useUser;
