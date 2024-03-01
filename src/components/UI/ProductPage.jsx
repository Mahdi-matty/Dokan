import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../../utils/API";
import { useAuthContext } from "../../utils/AuthContext"
export default function ProductPage(){
    const {id} = useParams();
    console.log(id)
    const [product , setProduct] = useState('')
    const {isLoggedIn, token} = useAuthContext()
    const [showCommentForm, setShowCommentForm] = useState(false)
    const [reviews, setReviews] = useState([])
    console.log(token)
    const [newGetOrder, setNewGetOrder] = useState('')
    const clientId = localStorage.getItem('clientId');
    const [comment, setComment] = useState('')
    const navigate = useNavigate()

    // useEffect(() => {
    //   const savedToken = localStorage.getItem('token');
    //   if (savedToken) {
    //     setIsLoggedIn(true);
    //   }
    // }, []);

 useEffect(()=>{
    API.getOneProduct(id).then(data=>{
        setProduct(data)
    })
 }, [])

 useEffect(()=>{
    API.getProductReviwes(id).then(data=>{
        setReviews(data)
    })
 }, [])

 const addItemToCard = async (product) => {
  const productID = product.id;
  
  if (!isLoggedIn) {
      navigate(`/login`);
  } else {
      try {
          const basketData = await API.getUserBasket(token, clientId);
          
          if (basketData && basketData.id) {
              const basketId = basketData.id;
              localStorage.setItem('basketId', basketId)
              const orderObj = {
                  productId: id,
                  BasketId: basketId
              };

              console.log(orderObj);

               const promise = await API.createOrder(token, orderObj)
                promise.then(newOrder=>{
                    console.log(newOrder);
                    setNewGetOrder(newOrder)
                })
                
               
              
          } else {
              console.error('Basket data is invalid:', basketData);
              // Handle invalid basket data
          }
      } catch (error) {
          console.error('Error adding item to card:', error);
          // Handle error
      }
  }

  const productObj= {
    stock: product.stock-1
  }
  API.editProduct(token, id, productObj).then(data=>{
    console.log(data)
  })
};

const addComment = ()=>{
 setShowCommentForm(!showCommentForm)
}

    const registerComment = (e)=>{
        e.preventDefault();
        const reviewObj ={
            comment: comment,
            productId: id,
            clientId: clientId
        }
        console.log(reviewObj)
        API.postReview(token, reviewObj).then(data=>{
            API.getProductReviwes().then(data=>{
                setReviews(data)
            })
        })
        
    }


 return (
    <>
        <div>
            {product.productPic && <img src={product.productPic}/> }
            <h2>{product.title}</h2>
            <p>{product.content}</p>
            <button onClick={()=>addComment()}>Add review</button>
                    {showCommentForm && (
                        <form onSubmit={e=>registerComment(e)}>
                             <input 
                                name="comment"
                                id="comment"
                                value={comment}
                                placeholder="enter your comment"
                                onChange={e=>setComment(e.target.value)}
                                type="text"/>
                                <button type="submit">Submit</button>
                        </form>
                    )}
            {(reviews || []).map(review=>(
                <li key={review.id}>
                    <p>{review.comment}</p>
                </li>
            ))}
            <button onClick={(product)=>addItemToCard(product)} >add item to card</button>
        </div>
    </>
 )
}