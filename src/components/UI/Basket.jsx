import { useState, useEffect } from "react"
import API from '../../utils/API'
import ChekOut from './ChekOut'

export default function Basket(){
    const clientId = localStorage.getItem('clientId')
    const [baskets , setBasket ] = useState([])
    const [showCheckOut, setShowChekOut] = useState(false)

    useEffect(()=>{
        API.getUserBasket(clientId).then(data=>{
            setBasket(data)
        })
    })


    return (
        <>
        <div>
            {
                baskets.map((basket)=>(
                    <li key={basket.id}>
                        <p>{basket.productId}</p>
                    </li>
                ))
            }
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