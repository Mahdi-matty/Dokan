import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../../utils/API";

export default function ProductPage(){
    const {id} = useParams();
    console.log(id)
    const [product , setProduct] = useState('')
    const [loggedin, setloggedIn] = useState(false)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
 useEffect(()=>{
    API.getOneProduct(id).then(data=>{
        setProduct(data)
    })
 }, [])

 const addItemToCard = (product)=>{
    const productID = product.id
    const orderObj ={
          productId : productID
      }
    if (!loggedin) {
        return (
          <div className="container text-center">
            <h1>Please log in to access your profile.</h1>
            <Link to="/login">Back to Home</Link>
          </div>
        )
      }else {
        API.createOrder(token, orderObj).then(data=>{
            console.log(data)
            navigate('/basket')
        })
      }
 }

 return (
    <>
        <div>
            {product.productPic && <img src={product.productPic}/> }
            <h2>{product.title}</h2>
            <p>{product.content}</p>
            {(product.reviews || []).map(review=>(
                <li key={review.id}>
                    <p>{review.comment}</p>
                </li>
            ))}
            <button onClick={(product)=>addItemToCard(product)} >add item to card</button>
        </div>
    </>
 )
}