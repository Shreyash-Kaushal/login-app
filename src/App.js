import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Registration from './Components/Registeration';
import Login from './Components/Login';
import Login2 from './Components/NewLogin';

function App() {
 
  return (
    // <Router>
    //     <Routes>
    //       <Route 
    //       exact 
    //       path="/"
    //       element={<Login/>}
    //       />
    //       <Route 
    //       path="/register"
    //       element={<Registration/>}
    //       />
    //     </Routes>
    //     <div className='register-div'>
    //       <span>New user please <Link to="/register">Register</Link> here</span>
    //     </div>
    // </Router>
    <Login2 />
  );
}

export default App;
