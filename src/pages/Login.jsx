import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import SignUp from '../compoenents/SignUp';
import API from '../utils/API'

export default function Login(){
    const navigate = useNavigate();
    const [userName, setuserName] = useState('');
    const [PassworD, setPassword] = useState('');
    const [token, setToken] = useState("");
    const [loggedin, setIsLoggedIn] = useState(false)
    const [showSignup, setShowSignup] = useState(false);

    const handleSubmit = (e)=> {
        e.preventDefault();
        const userObj = {
          userName,
          PassworD
        } 
        API.login({
            username:userObj.userName,
            password:userObj.PassworD,
          })
        .then(data=>{
          console.log(data);
          setIsLoggedIn(true);
          setToken(data.token);
          localStorage.setItem('clientId', data.client.id)
          localStorage.setItem("token",data.token)
          navigate('/profile')
        }).catch(err=>{
          console.log(err);
        })
      }
      const toggleSignup = () => {
        setShowSignup(!showSignup);
        document.querySelector('.formLogin').style.diplay = "none"
      };
      const handleSignup = userObj=>{
       API.signup({
            username:userObj.username,
            password: userObj.password,
            email: userObj.email,
          }).then(data=>{
          console.log(data);
          setIsLoggedIn(true);
          setToken(data.token);
          localStorage.setItem("token",data.token)
        }).catch(err=>{
          console.log(err);
        })
      }


    return (
        <>
             <h1>login</h1>
             <div className='loginPart'>
          <div className='loginDev'>
            <form className='formLogin' onSubmit={(e)=>handleSubmit(e, {userName, PassworD})}>
                <input
                value={userName}
                name="userName"
                onChange={e=> setuserName(e.target.value)}
                type="text"
                placeholder="userName" />
                <input
                value={PassworD}
                name="passworD"
                onChange={e=> setPassword(e.target.value)}
                type="password"
                placeholder="password"
              />
              <button type="submit">
                Login
              </button>
            </form>
        </div>
        <button onClick={toggleSignup} className="signUpButton">
            Signup
          </button>
          {showSignup && <SignUp subHandle={handleSignup} />}
        </div>
        </>
    )
} 