import { Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import { Navbar } from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Postdetails from "./pages/Postdetails"
import Createpost from "./pages/Createpost"
import Editpost from "./pages/Editpost"
import Profile from "./pages/Profile"
import Myblogs from "./pages/Myblogs"
import { UserContextProvider } from './context/userContext'; // Update import

function App() {


  return (
    <>
      <UserContextProvider>
     
      <Routes>

        <Route exact path='/' element={<Home />} />
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path='/posts/post/:id' element={<Postdetails/>}/>
        <Route exact path='/write' element={<Createpost/>}/>
        <Route exact path='/edit/:id' element={<Editpost/>}/>
        <Route exact path='/profile/:id' element={<Profile/>}/>
        <Route exact path='/myblogs' element={<Myblogs />}/>
    
      </Routes>
</UserContextProvider>
   


    </>
  )
}

export default App
