import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/API'
export default function HomePage(){

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
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