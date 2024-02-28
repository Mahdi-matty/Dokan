import { useState, useEffect } from "react"
import API from '../../utils/API'
import ChekOut from './ChekOut'
import { useAuthContext } from "../../utils/AuthContext"

export default function Basket(){
    const clientId = localStorage.getItem('clientId')
    const {isLoggedIn, token} = useAuthContext
    const [orders, setOrders] = useState([])
    const basketId = localStorage.getItem('basketId')
    console.log(clientId)
    const [showCheckOut, setShowChekOut] = useState(false)

    useEffect(()=>{
        if(isLoggedIn){
            console.log(basketId)
            API.getUserOrder(token, basketId).then(orders=>{
                console.log(orders)
                setOrders(orders)
             })       
     }}, [])
    


    const checkOutDev = ()=>{
        setShowChekOut(!showCheckOut)
    }


    return (
        <>
        <div>
            {/* {
                baskets.map((basket)=>(
                    <li key={basket.id}>
                        <p>{basket.productId}</p>
                    </li>
                ))
            } */}
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