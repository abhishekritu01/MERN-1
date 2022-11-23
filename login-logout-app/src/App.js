import './App.css'
import React, { useState } from 'react'
import Homepage from './components/homepage/homepage';
import Login from './components/login/login'
import Register from './components/register/register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



const App = () => {

  const [user, setLoginUser] = useState({
    // name: '',
    // email: '',
    // password: ''
  })
  return (
    <div className='App'>
{/* {user && user._id ? <Homepage /> : <Login /> } */}
      <Router>
        <Routes>
          <Route exact path="/"  element={user && user._id ? <Homepage  setLoginUser={setLoginUser}/> : <Login setLoginUser={setLoginUser}/>} /> 
          <Route path="/login" element={<Login  setLoginUser={setLoginUser}/>} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>


    </div>
  )
}

export default App