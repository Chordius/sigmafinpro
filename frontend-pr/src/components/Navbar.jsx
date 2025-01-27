import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png'

const Navbar = ({ onLoginClick, onSignUpClick }) => {
    
    let userIsLoggedIn;

    const [showMenu, setShowMenu] = useState(false);
    const handleClick = () => setShowMenu(!showMenu);

    const navigate = useNavigate()

    const handleGoLogout = () => {
      localStorage.removeItem('user'); // Clear user data
      userIsLoggedIn = false;
      navigate('/', {state: '/about'})
      window.location.reload();
    }

    const handleAdmin = () => {
      if (JSON.parse(localStorage.getItem('user')).data.admin === true) {
        navigate('/admin')
      }
    }

    {/* Function to check if user has logged in */}
    if (localStorage.getItem('user')) {
      userIsLoggedIn = true;
    }

  return (
    <div className='fixed w-full h-24 flex items-center justify-between bg-slate-400 text-white p-4 z-50'>
      <img src={Logo} alt='Logo Image' style={{ width: '215px' }} className='-translate-x-2'></img>
      
      {/* Add Navbar */}
      <div className = { !showMenu ? 'hidden md:flex' : 'hidden' }>
        <ul>
          <NavLink to='/'>
            <button className='inline-block border-1 rounded-lg px-4 py-2 hover:bg-slate-600 duration-100'>
              Home
            </button>
          </NavLink>
          <NavLink to='/about'>
            <button className='inline-block border-1 rounded-lg px-4 py-2 hover:bg-slate-600 duration-100'>
              About
            </button> 
          </NavLink>
          { userIsLoggedIn ?
            <NavLink to='/order'>
              <button className='inline-block border-1 rounded-lg px-4 py-2 hover:bg-slate-600 duration-100'>
                Order
              </button>
            </NavLink>
            :
            <button onClick={onLoginClick} className='inline-block border-1 rounded-lg px-4 py-2 hover:bg-slate-600 duration-100'>
              Order
            </button>
          }
          { userIsLoggedIn ?
            <button onClick={handleAdmin} className='inline-block border-1 rounded-lg px-4 py-2 hover:bg-slate-600 duration-100'>
              {JSON.parse(localStorage.getItem('user')).data.name}
            </button>
            :
            <button onClick={onLoginClick} className='inline-block border-1 rounded-lg px-4 py-2 hover:bg-slate-600 duration-100'>
              Login
            </button>
          }
          { userIsLoggedIn ?
            <button onClick={handleGoLogout} className='inline-block border-2 rounded-lg px-4 py-2 hover:bg-slate-600 duration-100 border-white'>
              Log Out
            </button>
            :
            <button onClick={onSignUpClick} className='inline-block border-1 rounded-lg px-4 py-2 hover:bg-slate-600 duration-100'>
              Sign Up
            </button>
          }
        </ul>
      </div>

      {/* Add Hamburger Menu  */}
        <div onClick={handleClick}  className = { !showMenu ? 'flex md:hidden' : 'flex'} >
            {!showMenu ? <FaBars /> : <FaTimes />}
        </div>

      {/* Add Mobile Menu */}
      <ul className = {!showMenu ? 'hidden' : 'absolute top-24 left-0 w-full h-auto p-4 flex flex-col justify-center items-center bg-slate-400 text-white duration-100' }>
        <li className = 'py-2 text-2xl'>
          <button>
            <NavLink to='/'>Home</NavLink>
          </button>
        </li>
        <li className = 'py-2 text-2xl'>
          <NavLink to='/about'>About</NavLink>
        </li> 
        <li className = 'py-2 text-2xl'>
          <NavLink to='/order'>Order</NavLink>
        </li>
        { userIsLoggedIn ?
          <li className = 'py-2 text-2xl space-x-8'>
            <button onClick={handleAdmin}>{JSON.parse(localStorage.getItem('user')).data.name}</button>
            <button onClick={handleGoLogout}>Log Out</button>
          </li>
          :
          <li className = 'py-2 text-2xl space-x-8'>
            <button onClick={onLoginClick}>Login</button>
            <button onClick={onSignUpClick}>Sign Up</button>
          </li>
        }
      </ul>
    </div>
  )
}

export default Navbar
