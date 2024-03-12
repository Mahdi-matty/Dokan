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
    const [collects, setCollects] = useState([])
    
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
    useEffect(()=>{
      if(token){
           API.getUserBasket(token, clientId).then(data=>{
              console.log(data)
          const basketId = data.id
          console.log(basketId)
          return basketId
          }).then(basketId=>{
              if (basketId){
                  API.getUserOrder(token, basketId).then(collectz=>{
                      console.log(collectz)
                      setCollects(collectz)
                   
              }).catch(err=>{
                  console.error('eror fetching data: ', err)
              });
          }
      })
      }
         
          
   }, [token])

   useEffect(() => {
    collects.map(collect => {
      const productId = collect.product.id;
      API.getOneProduct(productId)
        .then(prod => {
          if (prod.status === 'unavailable') {
            const noteObj = {
              msg: 'item is now available',
              productId: productId
            };
            API.postNotification(noteObj)
              .then(res => {
                console.log(res);
              })
              .catch(error => {
                console.error('Error posting notification:', error);
              });
          }
        })
        .catch(error => {
          console.error('Error fetching product:', error);
        });
    });
  }, [collects]);

  useEffect(() => {
    
    const notifications = [];

    collects.forEach(collect => {
        const productId = collect.product.id;

        const answer =API.getProductNotification(productId)
          if(answer){
            answer.then(res => {
                notifications.push(res);
                localStorage.setItem('notifications', JSON.stringify(notifications));
            })
            .catch(error => {
                console.error('Error fetching notifications:', error);
            });
          }
            
    });
}, [collects]);
  

   

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
           
           {Object.keys(categories).map((categoryName, index) => (
          <div className="category-card" key={index}>
            <Link to={`/categorysub/${categoryName}`}>
                <p>{categoryName}</p>
            </Link>
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