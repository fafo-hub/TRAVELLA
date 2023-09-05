import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const location =  useLocation()
  //const id = location.pathname.split("/")[2];
  //console.log(id);
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { data, loading, error, dispatch } = useContext(AuthContext);
  //console.log(data, loading);
  console.log(JSON.parse(localStorage.getItem("datas")));
  const Id = JSON.parse(localStorage.getItem("datas"));
  console.log(Id._id);
 const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      //console.log('credentials');
      const res = await axios.post("/auth/login", credentials);
      console.log(res);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate(`/hotels/${Id._id}`)
      //toast.success(loading)
      //console.log(error.message);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      console.log(error);
      console.log(err);
      // toast.error(error.message)
      //error.message ? toast.error(error.message) : null
      // if (error.message) {
      //   toast.error(error.message)
      // } else {
      //   toast.success('')
      // }
    }
  };
  // useEffect(() => {
  //   error ? toast.error(error.message) : console.log('nil');
  // }, [error])


  useEffect(() => {
    handleClick()
    error ? toast.error(error.message) : console.log('nil');
  }, [error])


  //console.log(user);
  // const notify = () => {
  //     toast('error.message');
  // }
  // const click = (e) => {
  //   handleClick(e)
  //   notify()
  // }


  return (
    <div>
      <div className="navheaderwrap">
        <Navbar />
        <Header type="list" />
      </div>
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick } className="lButton">
          Login
        </button>
        <ToastContainer />
        {error && <span>{error.message}</span>}
        {/* {error &&  toast.error(error.message)} */}
      </div>
    </div>
    </div>
  );
};

export default Login;