import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import "./login.css"
const Login = () => {
const [credentTials, setcredentTials] = useState({
    username:undefined,
    password:undefined
})
const navigate=useNavigate()
const {user,loading,error,dispatch}=useContext(AuthContext)
const handleChange=e=>{
    setcredentTials((prev)=>({...prev,[e.target.id]:e.target.value}))
}

const handleClick= async(e)=>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"})

    try{
const res=await axios.post("http://localhost:4000/auth/login",credentTials)
dispatch({type:"LOGIN_SUCCESS",payload:res?.data?.data})
navigate("/")
    }catch(err){
        dispatch({type:"LOGIN_FAILURE",payload:err?.massage?.data?.data})

    }

}

console.log(user);
    return (
        <div>
            <input type='text' placeholder="username" id='username' className='lInput' onChange={handleChange}></input>
            <input type='password' placeholder="password" id='password'className='lInput' onChange={handleChange}></input>
            <button disabled={loading} onClick={handleClick} className='lButton'>Login</button>
            {error && <span>{error?.massage}</span>}
        </div>
    );
};

export default Login;