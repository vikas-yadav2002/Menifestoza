import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Blog from './pages/Blog';
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Blogs from './pages/Blogs';
import CreateBlog from './pages/CreateBlog';
import { ThemeProvider } from './context/ThemeContext';
import { useState } from 'react';


function App() {
  const [DarkTheme, setDarkTheme] = useState(true);
  

  const changeTheme = () => {
    setDarkTheme(!DarkTheme);
  };

  return (
    <>
      <ThemeProvider value={{ DarkTheme, changeTheme }}>
        <BrowserRouter>
          <Routes>
            {/* Show Spinner while loading */}
            <Route
              path="/"
              element={ <Blogs />}
            />
            <Route path="/blogs" element={ <Blogs />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/:id" element={<Blog />} />
            <Route path="/createblog" element={<CreateBlog />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
