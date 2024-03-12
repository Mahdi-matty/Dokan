import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../utils/API";

export default function CategoryPart(){
    const [products, setProducts] =useState([])
    const [productz, setProductz] = useState('')
    const {id} = useParams()

    useEffect(()=>{
        API.getOneCategory(id).then(data=>{
            console.log(data)
            if(data.Products.length>1){
                setProducts(data.Products)
            }else(
                setProductz(data.Products[0])
            )
            
        }) 
    }, [])

    useEffect(()=>{
        console.log(productz)
    }, [productz])
    


    return (
        <>
            <div>
              
                    {products.length >1 ? (
                        <div>
                        <ul>
                            {products.map(product=>(
                                <li key={product.id}>
                                    <Link to={`/products/${product.id}`}>{product.title}</Link>
                                </li>
                            ))}
                        </ul>
                        </div>
                    ) :(
                        <div>
                        <Link to={`/products/${productz.id}`}><p>{productz.title}</p></Link>
                        <p>{productz.content}</p>
                        </div>
                    )}
                    
             
            </div>
        </>
    )

}