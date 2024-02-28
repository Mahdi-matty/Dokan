import { createContext, useState, useEffect, useContext } from "react";
import API from "./API";

export const AuthContext = createContext();

export const useAuthContext = ()=>useContext(AuthContext)


export default function AuthProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState('')

    useEffect(() => {
       const savedToken= localStorage.getItem('token')
        if (savedToken) {
          API.getDataFromToken(savedToken).then(data=>{
            console.log(data)
            setToken(savedToken);
            setIsLoggedIn(true)
          }).catch(err=>{
            localStorage.removeItem("token");
          })
        }
      },[])



      return (
        <AuthContext.Provider value={{isLoggedIn, token}}>
            {children}
        </AuthContext.Provider>
      )
}