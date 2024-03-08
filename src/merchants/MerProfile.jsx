import { useEffect, useState, useRef  } from "react"
import API from '../utils/API'
import { useAuthContext } from "../utils/AuthContext"
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
    const [showNewForm, setShowNewForm] = useState(false)
    const [formState, setFormState] = useState([])
    const [imageAddress, setImageAddress] = useState('')
    const merchantId = localStorage.getItem('merchantId')
    console.log(merchantId)
    const fileInput = useRef(null);

    useEffect(()=>{
        fetch(`http://localhost:3001/api/merchants/${merchantId}`).then(res=>res.json()).then(data=>{
          console.log(data)
          setProducts(data.Products)
        })
      },[merchantId])

    const popEdit = (product)=>{
        setEditId(product.id)
    }

    const editProduct = (event)=>{
        event.preventDefault()
        const productId = editId
        const productObj ={
            title: title,
            content: content,
            productPic: imageAddress,
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

    const handleImageUpload = (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('image', fileInput.current.files[0]);
      
        const postImage = async () => {
          try {
            const res = await fetch('http://localhost:3001/api/upload/image-upload', {
              mode: 'cors',
              method: 'POST',
              body: data,
            });
            if (!res.ok) throw new Error(res.statusText);
            const postResponse = await res.json();
            setFormState({ ...formState, image: postResponse.Location });
            console.log('postImage: ', postResponse.Location);
            setImageAddress(postResponse.Location)
            return postResponse.Location;
          } catch (error) {
            console.log(error);
          }
        };
        postImage();
      };
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
                            <button onClick={()=>popEdit(product)}>edit</button>
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
                                    name="stock"
                                    id="stock"
                                    value={stock}
                                    onChange={e=>setStock(e.target.value)}
                                    placeholder="Type a Question"
                                    type="text"
                                    className="questionNewCard"/>
                                    <label className="form-input col-12  p-1">
                                        Add an image:
                                        <input type="file" ref={fileInput} className="form-input p-2" />
                                        <button className="btn" onClick={handleImageUpload} type="submit">
                                            Upload
                                        </button>
                                    </label>
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