import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import SignUp from '../compoenents/SignUp';
import API from '../utils/API'
export default function HomePage(){

  const [products, setProducts] = useState([])
  useEffect(()=>{
    API.getAllProduct().then(data=>{
      setProducts(data)
    })
  })
   

    return (
        <>
          <div>
            <ul>
              {
                products.map((product)=>(
                  <li key={product.id}>
                    <img src={product.productPic}/>
                    <Link to={`/products/${product.id}`}>
                      <p>{product.title}</p>
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
        
        </>
    )
}