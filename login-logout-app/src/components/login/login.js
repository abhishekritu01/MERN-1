import React, { useState } from 'react'
import './login.css'
import axios from 'axios'

import {useNavigate} from 'react-router-dom';

const Login = ({setLoginUser}) => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const handleChange = e => {
    const { name, value } = e.target
    console.log(name, value);
    setUser({
      ...user,
      [name]: value

    })
  }

  const login = () => {
    axios.post('http://localhost:2000/login', user)
      .then(res => {
        alert(res.data.message)
        setLoginUser(res.data.user)
        navigate('/')
      })
  }

  return (
    <div className='login'>
      {console.log("user", user)}
      <h1>Login</h1>
      <input type="text" name='email' value={user.email} placeholder='Enter your Email' onChange={handleChange} />
      <input type="password" name='password' value={user.password} placeholder='Enter your password' onChange={handleChange} />
      <button className='button' onClick={login}>Login</button>
      <div>or</div>
      <button className='button' onClick={() => navigate('/register')} >Register</button>
    </div>
  )
}
export default Login