import { useState, useEffect } from "react"
import API from '../../utils/API'
import ChekOut from './ChekOut'
import { useAuthContext } from "../../utils/AuthContext"

export default function Basket(){
    const clientId = localStorage.getItem('clientId')
    const {isLoggedIn, token} = useAuthContext()
    const [orders, setOrders] = useState([])
    const [showCheckOut, setShowChekOut] = useState(false)


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
                    API.getUserOrder(token, basketId).then(orders=>{
                        console.log(orders)
                        setOrders(orders)
                }).catch(err=>{
                    console.error('eror fetching data: ', err)
                });
            }
        })
        }
           
            
     }, [token])


    


    const checkOutDev = ()=>{
        setShowChekOut(!showCheckOut)
    }


    return (
        <>
        <div>
            <ul>
                {orders.map((order)=>(
                    <li key={order.id}>
                        <p>{order.productId}</p>
                    </li>
                ))}
            </ul>
            
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