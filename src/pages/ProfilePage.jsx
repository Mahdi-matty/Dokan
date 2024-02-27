import { useEffect, useState } from "react"
import API from '../utils/API'
import { Link, useNavigate } from "react-router-dom"
import { SlBasketLoaded } from "react-icons/sl"

export default function ProfilePage(){
    const [products, setProducts] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const token = localStorage.getItem('token')
    const clientId = localStorage.getItem('clientId')
    const navigate = useNavigate()

    useEffect(()=>{
        API.getAllProduct().then(data=>{
        setProducts(data)
        })
    })

    if (!isLoggedIn) {
        return (
          <div className="container text-center">
            <h1>Please log in to access your profile.</h1>
            <Link to="/">Back to Home</Link>
          </div>
        );
      }


    return (
        <>
            <div>
                <Link to="/basket"
                onClick={()=>navigate('basket')}
                >
                    <SlBasketLoaded className="iconSize"/>
                    <span>Card</span>
                </Link>
            </div>
        </>
    )

}