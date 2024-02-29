import { useState, useEffect } from "react"
import API from '../../utils/API'
import ChekOut from './ChekOut'
import { useAuthContext } from "../../utils/AuthContext"

export default function Basket(){
    const clientId = localStorage.getItem('clientId')
    const {isLoggedIn, token} = useAuthContext()
    const [collects, setCollects] = useState([])
    const [showCheckOut, setShowChekOut] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0);


    let basketId
    useEffect(()=>{
        if(token){
             API.getUserBasket(token, clientId).then(data=>{
                console.log(data)
            basketId = data.id
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
        const totalPrice = collects.reduce(
            (accumulator, currentCollect) => accumulator + currentCollect.product.price,
            0
        );
        setTotalPrice(totalPrice);
    }, [collects]);
    


    const checkOutDev = ()=>{
        setShowChekOut(!showCheckOut)
        console.log(totalPrice)
    };

    const deleteOrder = (collect)=>{
        const orderId = collect.order.id
        API.deleteOrder(token, orderId).then(data=>{
            console.log(data)
        })
    }


    return (
        <>
        {collects.map(collect=>(
            <li key={collect.order.id}>
                <p>Order Id: {collect.order.id}</p>
                <p>{collect.product.title}</p>
                <p>{collect.product.price}</p>
                <p>{collect.product.status}</p>
                <button onClick={()=>deleteOrder(collect)}>Remove Order</button>
            </li>
        ))}
        <div>
            <p>Proced to chekout</p>
            <button onClick={()=>checkOutDev()}>Checkout</button>
        </div>
        {showCheckOut && (
            <div>
                <ChekOut />
            </div>
        )}

        </>
    )
    
}