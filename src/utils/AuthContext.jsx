import { createContext, useState, useEffect, useContext } from "react";
import API from "./API";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const useAuthContext = ()=>useContext(AuthContext)


export default function AuthProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState('')
    const location = useLocation();
    const [userStatus, setUserStatus] = useState('')

    useEffect(() => {
       const savedToken= localStorage.getItem('token')
        if (savedToken) {
          API.getDataFromToken(savedToken).then(data=>{
            console.log(data)
            setToken(savedToken);
            setIsLoggedIn(true)
            setUserStatus(data.status)
            console.log(userStatus)
            if(data.status == 'client'){
              localStorage.setItem('clientId', data.user.id)
            }else if(data.status == 'merchant'){
              localStorage.setItem('merchantId', data.user.id)
            }
          }).catch(err=>{
            localStorage.removeItem("token");
          })
        }
      },[location])



      return (
        <AuthContext.Provider value={{isLoggedIn, token, userStatus}}>
            {children}
        </AuthContext.Provider>
      )
}