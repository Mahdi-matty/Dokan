import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../utils/API";

export default function CategoryPart(){
    const [products, setProducts] =useState([])
    const {id} = useParams()

    useEffect(()=>{
        API.getCategory(id).then(data=>{
            setProducts(data)
        }) 
    }, [])
    


    return (
        <>
            <div>
                <ul>
                    {products.map(product=>(
                        <li key={product.id}>
                            <Link to={`/products/${product.id}`}>{product.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )

}