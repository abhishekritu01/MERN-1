import React, { useState } from 'react'
import './register.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: ""
  })

  const handleChange = e => {
    // console.log(e.target);
    const { name, value } = e.target
    // console.log(name, value);
    setUser({
      ...user,
      [name]: value
    })
  }

  const register = () => {
    const {name,email,password,reEnterPassword}= user;

    if(name && email && password &&(password===reEnterPassword)){
      // alert('posted')
      axios.post('http://localhost:2000/register',user)
      .then(res => {
        alert(res.data.message)
        navigate('/login')
        
      
      })
    }else {
      alert("invalid input")
    }
  }





  return (
    <div className='register'>
      {console.log("user", user)}
      <h1>Register</h1>
      <input type="text" name='name' value={user.name} placeholder='Enter your Name' onChange={handleChange} />
      <input type="text" name='email' value={user.email} placeholder='Enter your Email' onChange={handleChange} />
      <input type="password" name='password' value={user.password} placeholder='Enter your Password' onChange={handleChange} />
      <input type="password" name='reEnterPassword' value={user.reEnterPassword} placeholder='Re-enter your Password' onChange={handleChange} />
      <button className='button' onClick={register}>Register</button>
      <div>or</div>
      <button className='button' onClick={()=>navigate('/login')}>Login</button>
    </div>
  )
}

export default Register