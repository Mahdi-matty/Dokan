import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/API'
export default function HomePage(){

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [searchResault, setSerachResault] = useState([])
  useEffect(()=>{
    API.getAllProduct().then(data=>{
      setProducts(data)
    })
  }, [])
  useEffect(()=>{
    API.getCategories().then(data=>{
      console.log(data)
      setCategories(data)
    })
  }, [])

  const prSearch = (search)=>{
    API.searchProduct(search).then(res=>{
     setSerachResault(res)
    })
  }
   

  return (
    <>

       <div> 
        <form>
          <input
          name="search"
          id="search"
          placeholder="enter your search"
          onChange={e=>prSearch(e.target.value)}
          type="text"/>
        </form>
              {searchResault.length !== 0 && (
                <div className='search-container'>
                  <ul>
                    {searchResault.map((srz)=>(
                      <li key={srz.id}>
                        <Link to={`/products/${srz.id}`}><p>{srz.title}</p></Link>
                      </li>
                  ))}
                  </ul>
                </div>
              )}
           
       </div>
       <div className="categories-container">
       
       {Object.keys(categories).map((categoryName, index) => (
          <div className="category-card" key={index}>
            <Link to={`/categorysub/${categoryName}`}>
                <p>{categoryName}</p>
            </Link>
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