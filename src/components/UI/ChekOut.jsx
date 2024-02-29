import API from "../../utils/API";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../utils/AuthContext";


export default function ChekOut(){
    const {isLoggedIn, token} = useAuthContext();
    

    // useEffect(()=>{
    //     API.getUserOrder(token, )
    // })
    
}