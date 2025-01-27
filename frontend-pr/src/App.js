import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from "react";

import Navbar from './components/Navbar';
import Home from './components/Home';
import Order from './components/Order';
import About from './components/About';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm'
import Admin from './components/Admin';
import Auth from './utility/Auth';
import AdminAuth from './utility/AdminAuth';

function App() {
  
  var userIsLoggedIn = userIsLoggedIn

  const [showLoginModal, setShowLoginModal] = useState(false); // Control login modal visibility
  const [showSignupModal, setShowSignupModal] = useState(false); // Control signup modal visibility
  

  const handleCloseModal = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
  };

  return (
    <BrowserRouter>
      <div>
      <Navbar 
          onLoginClick={() => setShowLoginModal(true)}
          onSignUpClick={() => setShowSignupModal(true)}
      />
        <Routes>
          <Route path='/' element=
            {
              <Home onLoginClick={() => setShowLoginModal(true)} />
            } 
          />
          <Route path='/order' element={<Auth><Order /></Auth>} />
          <Route path='/about' element={<About />} />
          <Route path='/admin' element={<AdminAuth><Admin /></AdminAuth>} />
        </Routes>

      
      {showLoginModal && (
        <LoginForm onClose={handleCloseModal} /> 
      )}

      {showSignupModal && (
        <SignUpForm onClose={handleCloseModal} />
      )}

      </div>
    </BrowserRouter>
  );
}

export default App;
