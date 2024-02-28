import { useEffect, useState } from "react"
import API from '../utils/API'
import { Link, useNavigate } from "react-router-dom"
import { SlBasketLoaded } from "react-icons/sl"
import { useAuthContext } from "../utils/AuthContext"

export default function ProfilePage(){
    const [products, setProducts] = useState([])
    const {isLoggedIn, token} = useAuthContext()
    const navigate = useNavigate()
    let clientId;
    useEffect(()=>{
        API.getAllProduct().then(data=>{
        setProducts(data)
        })
    }, [])
    useEffect(() => {
      if (token) {
        API.getDataFromToken(token).then(userData=>{
          console.log(userData)
          clientId = userData.id
           localStorage.setItem('clientId', clientId)})
          .catch(err=>{
            console.log(err)
          })
      }
    }, []);

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
            <ul>
              {
                products.map((product)=>(
                  <li key={product.id}>
                    <img src={product.productPic}/>
                    <Link to={`/products/${product.id}`}>
                      <p>{product.title}</p>
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
        </>
    )

}