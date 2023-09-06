import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css"
import { Link, Navigate, useNavigate } from "react-router-dom"


const Navbar = () => {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate()
  const { loading, error, dispatch } = useContext(AuthContext);

  const Logout = ()=> {
    //console.log(user);
    //localStorage.clear(user)
    dispatch({ type: "LOGOUT"});
    //navigate('/login')
  }

  const Login = ()=> {
  navigate('/login')
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/">
          <span className="logo">TRAVELLA</span>
        </Link>
        { user ? ( (<div> <span>{ user.username }</span> <button onClick={Logout} className="navButton">Logout</button></div>)) : ( <div className="navItems">
          {/* <button className="navButton">Register</button> */}
          <button onClick={Login} className="navButton">Login</button>
        </div> )}
      </div>
    </div>
  )
}

export default Navbar