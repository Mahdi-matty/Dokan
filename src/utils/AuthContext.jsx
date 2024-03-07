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
      const userStatu = localStorage.getItem('userStatus')
      const savedToken= localStorage.getItem('token')
          if (savedToken) {
            if(userStatu == 'client'){
              setUserStatus('client')
              API.getDataTokenClient(savedToken).then(data=>{
              console.log(data)
              localStorage.setItem('clientId', data.id)
              setToken(savedToken);
              setIsLoggedIn(true)  
            });
            }else if (userStatu == 'merchant'){
              setUserStatus('merchant')
            API.getDataTokenMerchant(savedToken).then(data=>{
              console.log(data)
              localStorage.setItem('merchantId', data.id)
              setToken(savedToken);
              setIsLoggedIn(true)
            })
          };
        }
        else{
            localStorage.removeItem("token");
          }
        
    },[location])



      return (
        <AuthContext.Provider value={{isLoggedIn, token, userStatus}}>
            {children}
        </AuthContext.Provider>
      )
}