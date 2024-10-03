import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Blog from './pages/Blog'
import './App.css'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
// import BlogSection from './pages/BlogSection'
import Blogs from './pages/Blogs'
import CreateBlog from './pages/CreateBlog'
import { ThemeProvider } from './context/ThemeContext'
import { useState } from 'react'

function App() {
 const [DarkTheme , setDarkTheme] = useState(true)

 
  const changeTheme  = () =>{
    setDarkTheme(!DarkTheme)
  }

  return (
    <>
    <ThemeProvider value={{DarkTheme , changeTheme}}>
    <BrowserRouter>
      <Routes>
        <Route path='/blogs' element={<Blogs/>}></Route>
        <Route path='/' element={<Blogs/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/signin' element={<SignIn/>}></Route>
        <Route path='/:id' element={<Blog/>}></Route>
        <Route path='/createblog' element={<CreateBlog/>}></Route>
        
      
        
      </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
