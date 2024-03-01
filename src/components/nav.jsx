import { Link, useNavigate } from 'react-router-dom';
import Navbar from './UI/navbar'
import { useState, useEffect } from 'react';
import API from '../utils/API';
import { SlBasketLoaded } from "react-icons/sl"
import { useAuthContext } from '../utils/AuthContext';

export default function Nav() {
  const navigate = useNavigate()
  const {isLoggedIn, token, userStatus} = useAuthContext()
  if (userStatus === '') {
    // Render a loading indicator or placeholder content
    return <div>Loading...</div>;
  }
  console.log(userStatus)

  const logout = ()=>{
    localStorage.removeItem('token')
      navigate('/login')
    }
  
  return (
     <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className='container-fluid'>
        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
        <li className='nav-item'>
          <Link className="nav-link  newNavHead" to="/">
            Home
          </Link>
        </li>
        {userStatus == 'client'? (
          <div>
             <li className='nav-item'>
              <Link className="nav-link  newNavHead" to="/profile">
                Profile
              </Link>
            </li> 
            {isLoggedIn ? (
              <div>
                <li className='nav-item'>
                <Link className='nav-link  newNavHead' to='/basket'>
                  <SlBasketLoaded />
                  Card</Link>
              </li>
              <li className='nav-item'>
                <button className='nav-link  newNavHead' onClick={()=>logout()}>signout</button>
              </li>
              </div>
             ) :(
                <li className='nav-item'>
              <Link className="nav-link  newNavHead" to="/login">
                Login
              </Link>
            </li>
              )
            }
          </div>
        ) :(
          <div>
              <li className='nav-item'>
              <Link className="nav-link  newNavHead" to="/merchantprofile">
                Profile
              </Link>
            </li> 
            {isLoggedIn ? (
              <div>
              <li className='nav-item'>
                <button className='nav-link  newNavHead' onClick={()=>logout()}>signout</button>
              </li>
              </div>
             ) :(
                <li className='nav-item'>
              <Link className="nav-link  newNavHead" to="/merchantlogin">
                Login
              </Link>
            </li>
              )
            }
          </div>
        )}
       
            
       
        </ul>
      </div>
      
    </nav>
  )
 
}
