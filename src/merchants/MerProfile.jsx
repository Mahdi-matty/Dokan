import { useEffect, useState } from "react"
import API from '../utils/API'
import { Link, useNavigate } from "react-router-dom"
import { SlBasketLoaded } from "react-icons/sl"
import { useAuthContext } from "../utils/AuthContext"
import UploadCareUploader from './uploadcare'
export default function MerProfile(){
    const [editId, setEditId] =useState(false)
    const [products, setProducts] = useState([])
    const {isLoggedIn, token} = useAuthContext()
    const [title, setTtile] = useState('')
    const [content, setContent] = useState('')
    const [price, setPrice] = useState('')
    const [newTitle, setNewTtile] = useState('')
    const [newContent, setNewContent] = useState('')
    const [newPrice, setNewPrice] = useState('')
    const [stock, setStock] = useState('')
    const [newStock, setNewStock] = useState('')
    const navigate = useNavigate()
    const [showNewForm, setShowNewForm] = useState(false)

    useEffect(()=>{
        API.getMerchantProduct(token, merchantId).then(data=>{
            console.log(data)
            setProducts(data)
        })
    }, [token])

    const popEdit = (product)=>{
        setEditId(product.id)
    }

    const editProduct = ()=>{
        const productId = editId
        const productObj ={
            title: title,
            content: content,
            price: price,
            stock: stock
        }

        API.editProduct(token, productId, productObj).then(data=>{
            console.log(data)
        })
    }

    const addNewItem = ()=>{
        setShowNewForm(!showNewForm)
    }

    const addProduct = ()=>{
        const productObj = {
            title: newTitle,
            content: newContent,
            price: newPrice,
            stock: newStock,
            merchantId: merchantId
        }

        API.createProduct(token, productObj).then(data=>{
            console.log(data)
        })
    }
    return (
        <>
            <div>
                <ul>
                    {products.map(product=>(
                        <li key={product.id}>
                            <p>{product.title}</p>
                            <p>{product.content}</p>
                            <p>{product.price}</p>
                            <p>{product.stcok}</p>
                            <img src={product.productPic}/>
                            <button onClick={()=>popEdit(product)}></button>
                            <div>
                                {editId == product.id &&(
                                <form onSubmit={editProduct}>
                                    <input 
                                    name="title"
                                    id="title"
                                    value={title}
                                    onChange={e=>setTtile(e.target.value)}
                                    placeholder="Type a Question"
                                    type="text"
                                    className="questionNewCard"/>
                                    <input 
                                    name="content"
                                    id="content"
                                    value={content}
                                    onChange={e=>setContent(e.target.value)}
                                    placeholder="Type a Question"
                                    type="text"
                                    className="questionNewCard"/>
                                    <input 
                                    name="price"
                                    id="price"
                                    value={price}
                                    onChange={e=>setPrice(e.target.value)}
                                    placeholder="Type a Question"
                                    type="text"
                                    className="questionNewCard"/>
                                    <input 
                                    name="stcok"
                                    id="stcok"
                                    value={stcok}
                                    onChange={e=>setStock(e.target.value)}
                                    placeholder="Type a Question"
                                    type="text"
                                    className="questionNewCard"/>
                                    <button onClick={()=>uploadImage()}><UploadCareUploader />upload image</button>
                                    <button type="submit">Submit changes</button>
                                </form>
                            )}
                            </div>
                            
                        </li>
                    ))}
                </ul>
                <button onClick={()=>addNewItem()}>add new item</button>
                <div>
                     {showNewForm && (
                        <form onSubmit={addProduct}>
                            <input 
                                    name="newTitle"
                                    id="newTitle"
                                    value={newTitle}
                                    onChange={e=>setNewTtile(e.target.value)}
                                    placeholder="Type a title"
                                    type="text"
                                    className="questionNewCard"/>
                                    <input 
                                    name="newContent"
                                    id="newContent"
                                    value={newContent}
                                    onChange={e=>setNewContent(e.target.value)}
                                    placeholder="Type a Question"
                                    type="text"
                                    className="questionNewCard"/>
                                    <input 
                                    name="newPrice"
                                    id="newPrice"
                                    value={newPrice}
                                    onChange={e=>setNewPrice(e.target.value)}
                                    placeholder="Type a Question"
                                    type="text"
                                    className="questionNewCard"/>
                                     <input 
                                    name="newStock"
                                    id="newStock"
                                    value={newStock}
                                    onChange={e=>setNewStock(e.target.value)}
                                    placeholder="Type a Question"
                                    type="text"
                                    className="questionNewCard"/>
                                    <button type="submit">Submit changes</button>
                        </form>

                    )}
                </div>
               
            </div>
        </>
    )

}