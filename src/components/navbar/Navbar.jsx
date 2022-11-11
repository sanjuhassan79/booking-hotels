import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../Context/AuthContext"
import "./navbar.css"

const Navbar = () => {
  const {user,dispatch}=useContext(AuthContext)
const navigate=useNavigate()


  const onLogout = () => {
    dispatch({type:"LOGIN_SUCCESS",payload:null});

    navigate('/');
  };
 
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">lamabooking</span>

        {
      user?(
        <>
          user.username
        <button onClick={onLogout} className="navButton">Log out</button>
        </>
      
        
        
        
        ):(
<div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>
      )
        }
        
      </div>
    </div>
  )
}

export default Navbar