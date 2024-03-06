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
                      // setProducts(collectz.products)
                      // setOrders(collectz.orders)
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
    // Define an array to hold notifications
    const notifications = [];

    // Iterate through collects and fetch notifications for each product
    collects.forEach(collect => {
        const productId = collect.product.id;

        // Fetch notifications for the product
        API.getProductNotification(productId)
            .then(res => {
                // Push notifications to the array
                notifications.push(res);
                // Convert the array to a string and store it in localStorage
                localStorage.setItem('notifications', JSON.stringify(notifications));
            })
            .catch(error => {
                console.error('Error fetching notifications:', error);
            });
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