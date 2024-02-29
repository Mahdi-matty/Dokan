import { Link, useNavigate } from 'react-router-dom';
import Navbar from './UI/navbar'
import { useState, useEffect } from 'react';
import API from '../utils/API';
import { SlBasketLoaded } from "react-icons/sl"
import { useAuthContext } from '../utils/AuthContext';

export default function Nav() {
  const navigate = useNavigate()
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const token = localStorage.getItem('token');
  // useEffect(() => {
  //   if (token) {
  //     API.getDataFromToken(token).then(data=>{
  //       console.log(data)
  //       setToken(token);
  //       setIsLoggedIn(true)
  //     }).catch(err=>{
  //       localStorage.removeItem("token");
  //     })
  //   }
  // },[])
  const {isLoggedIn, token} = useAuthContext()

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
            
       
        </ul>
      </div>
      
    </nav>
  )
 
}
