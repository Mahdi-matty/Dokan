import { Link, useParams, useSearchParams } from "react-router-dom"
import API from "../../utils/API";
import { useEffect, useState } from "react";

export default function CategoryName(){
    const { categoryName } = useParams();
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const URL_PREFIX = "http://localhost:3001"
    useEffect(()=>{
        fetch(`${URL_PREFIX}/api/categories/sub/${categoryName}`).then(res=>
            res.json()).then(data=>{
                console.log(data)
                setCategories(data.category)
                setProducts(data.products)
            })
          
    }, [categoryName])

   


    return (
        <>
            <div>
                <ul>
                    {categories.map((category)=>(
                        <li key={category.id}>
                            <Link to={`/category/${category.id}`}>
                                <p>{category.sub}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <ul>
                    {products.map((productz)=>(
                        productz.map(product=>(
                             <li key={product.id}>
                            <Link to={`/products/${product.id}`}>
                                <p>{product.title}</p>
                            </Link>
                        </li>
                        ))
                       
                    ))}
                </ul>
            </div>
        </>
    )
}