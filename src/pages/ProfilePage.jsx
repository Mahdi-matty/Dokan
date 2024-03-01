import { useEffect, useState } from "react"
import API from '../utils/API'
import { Link, useNavigate } from "react-router-dom"
import { SlBasketLoaded } from "react-icons/sl"
import { useAuthContext } from "../utils/AuthContext"

export default function ProfilePage(){
    const [products, setProducts] = useState([])
    const {isLoggedIn, token} = useAuthContext()
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const clientId = localStorage.getItem('clientId')
    console.log(clientId)
    
    useEffect(()=>{
        API.getAllProduct().then(data=>{
        setProducts(data)
        })
    }, [])
    useEffect(()=>{
      API.getCategories().then(data=>{
        setCategories(data)
      })
    }, [])
  

   

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
           <div className="categories-container">
           
              {categories.map((category)=>(
                <div className="category-card" key={category.id}>
                  <Link to={`/category/${category.id}`}><p>{category.name}</p></Link>
                </div>
              ))}
          </div>
            <div className="products-container">
            <ul className="products-list">
              {
                products.map((product)=>(
                  <li className="product-card" key={product.id}>
                    <img src={product.productPic}/>
                    <Link to={`/products/${product.id}`}>
                      <p>{product.title}</p>
                    </Link>
                    {product.status == 'unavailable' &&(
                        <P>{product.status}</P>)}
                  </li>
                ))
              }
            </ul>
          </div>
        </>
    )

}