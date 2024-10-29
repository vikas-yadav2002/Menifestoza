import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

const useUser = () => {
  const [user, setUser] = useState(null); // Use null for uninitialized state
  const [loading, setLoading] = useState(true); // Add loading state
  const token = localStorage.getItem("token");

  const Headers = {
    Authorization: `Bearer ${token}`,
  };

  const fn = async () => {
    const cachedData = localStorage.getItem("user");

    if (!cachedData) {
      try {
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
      try {
        // Only parse if cachedData is not null or undefined
        const parsedData = JSON.parse(cachedData);
        console.log(cachedData);
        console.log("user")
        setUser(parsedData);
      } catch (error) {
        console.error("Error parsing cached user data:", error);
        setUser(null);
      }
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
