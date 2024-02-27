const URL_PREFIX = "http://localhost:3001"
const API = {

    login:userObj=>{
    return fetch(`${URL_PREFIX}/api/clients/login`,{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(!res.ok){
         throw new Error("invalid login")
        }
        return res.json()
      })
    },
    merlogin:userObj=>{
        return fetch(`${URL_PREFIX}/api/merchants/login`,{
            method:"POST",
            body:JSON.stringify(userObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(!res.ok){
            throw new Error("invalid login")
            }
            return res.json()
        })
    },
    logOut:()=>{
        fetch(`${URL_PREFIX}/api/clients/logOut`, {
            method: 'GET',
        }).then(res=>{
            if(!res.ok){
                throw new Error('something went wrong ')
            }
            return res.json()
        })
    },
    signup:userObj=>{
        return fetch(`${URL_PREFIX}/api/clients/`,{
            method:"POST",
            body:JSON.stringify(userObj),
            headers:{
                "Content-Type":"application/json"
        }
    }).then(res=>{
        if(!res.ok){
            throw new Error("invalid signup")
            }
            return res.json()
      })
    },
    merSignup:userObj=>{
        return fetch(`${URL_PREFIX}/api/merchants/`,{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(!res.ok){
         throw new Error("invalid signup")
        }
        return res.json()
      })
    },
    getDataFromToken:token=>{
        return fetch(`${URL_PREFIX}/api/clients/datafromtoken`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>{
            if(!res.ok){
             throw new Error("invalid token")
            }
            return res.json()
          })
    },
    getAllProduct:()=>{
        return fetch(`${URL_PREFIX}/api/products`,{
            method:"GET",
        }).then(res=>{
            if(!res.ok){
                console.log(Error)
             throw new Error("invalid token")
            }
            return res.json()
          })
    },
    getOneProduct: (productId)=>{
        return fetch(`${URL_PREFIX}/api/products/${productId}`, {
            method: 'GET',
        }).then(res=>{
            if(!res.ok){
                throw new Error('something went wrong')
            }else{
                return res.json()
            }
        })
    },
    createProduct:(token,productObj)=>{
        return fetch(`${URL_PREFIX}/api/products`,{
            method:"POST",
            body:JSON.stringify(productObj),
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>{
            if(!res.ok){
             throw new Error("cannot create")
            }
            return res.json()
          })
    },
    editProduct:(token,productId,productObj)=>{
        return fetch(`${URL_PREFIX}/api/products/${productId}`,{
            method:"PUT",
            body:JSON.stringify(productObj),
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>{
            if(!res.ok){
             throw new Error("cannot edit")
            }
            return res.json()
          })
    },
    deleteProduct:(token,productId)=>{
        return fetch(`${URL_PREFIX}/api/products/${productId}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>{
            if(!res.ok){
             throw new Error("cannot delete")
            }
            return res.json()
          })
    },
    getOneBasket: (token, basketId)=>{
        return fetch(`${URL_PREFIX}/api/basket/${basketId}`, {
            method: 'GET',
            headers: {
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>{
            if(!res.ok){
                throw new Error('something went wrong')
            }else{
                return res.json()
            }
        })
    },
    getUserBasket: (token, clientId)=>{
        return fetch(`${URL_PREFIX}/api/basket/client/${clientId}`, {
            method: 'GET',
            headers: {
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>{
            if(!res.ok){
                throw new Error('something went wrong')
            }else{
                return res.json()
            }
        })
    },
    editBasket:(token,basketId,basketObj)=>{
        return fetch(`${URL_PREFIX}/api/Basket/${basketId}`,{
            method:"PUT",
            body:JSON.stringify(basketObj),
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>{
            if(!res.ok){
             throw new Error("cannot edit")
            }
            return res.json()
          })
    },
    createOrder: (token, orderOBj)=>{
        fetch(`${URL_PREFIX}/api/orders`, {
            method: 'POST',
            body:JSON.stringify(orderOBj),
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>{
            if(!res.ok){
                throw new Error('something went wrong')
            }
            return res.json()
        })
    },
    getOneOrder: (token, orderId)=>{
        return fetch(`${URL_PREFIX}/api/basket/${orderId}`, {
            method: 'GET',
            headers: {
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>{
            if(!res.ok){
                throw new Error('something went wrong')
            }else{
                return res.json()
            }
        })
    },
    editOrder:(token,orderId,orderObj)=>{
        return fetch(`${URL_PREFIX}/api/Basket/${orderId}`,{
            method:"PUT",
            body:JSON.stringify(orderObj),
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>{
            if(!res.ok){
             throw new Error("cannot edit")
            }
            return res.json()
          })
    },
    deleteOrder:(token,orderId)=>{
        return fetch(`${URL_PREFIX}/api/products/${orderId}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>{
            if(!res.ok){
             throw new Error("cannot delete")
            }
            return res.json()
          })
    },
    getCategory: (categoryId)=>{
        return fetch(`${URL_PREFIX}/api/products/categoryProd/${categoryId}`,{
            method: 'GET',
        }).then(res=>{
            if(!res.ok){
                throw new Error("unable to get this category")
            }
            return res.json()
        })
    },
    getCategoryByName: (categoryName)=>{
        fetch(`${URL_PREFIX}/api/products/categoryByName/${categoryName}`, {
            method: 'GET',
        }).then(res=>{
            if(!res.ok){
                throw new Error('something went wrong')
            }
            return res.json()
        })
    },
    getCategoryBySub: (categoryName, categorySub)=>{
        fetch(`${URL_PREFIX}/api/products/categoryByNameSub/${categoryName}/${categorySub}`, {
            method: 'GET',
        }).then(res=>{
            if(!res.ok){
                throw new Error('something went wrong')
            }
            return res.json()
        })
    }


}
export default API

