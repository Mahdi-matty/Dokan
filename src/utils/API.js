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
    getDataTokenClient:token=>{
        return fetch(`${URL_PREFIX}/tokenDataClient`,{
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
    getDataTokenMerchant:token=>{
        return fetch(`${URL_PREFIX}/tokenDataMerchant`,{
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
    getMerchantProduct:(merchantId)=>{
        fetch(`${URL_PREFIX}/api/products/merchant/${merchantId}`, {
            method: 'GET',
        }).then(Response=>{
            if(!Response.ok){
                throw new Error('something went wrong')
            }else{
                return Response.json()
            }
            
        }).catch(err=>{
            console.error('serror fetching data', err)
            throw Error
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
    searchProduct: (title)=>{
          return fetch(`${URL_PREFIX}/search/search?tag=${title}`, {
            method: 'GET'
          }).then(res=>{
            if(!res.ok){
                throw new Error('something went wrong')
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
        return fetch(`${URL_PREFIX}/api/basket/${basketId}`,{
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
    createOrder: (token, orderObj)=>{
        fetch(`${URL_PREFIX}/api/orders`, {
            method: 'POST',
            body:JSON.stringify(orderObj),
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
        return fetch(`${URL_PREFIX}/api/orders/${orderId}`, {
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
        return fetch(`${URL_PREFIX}/api/orders/${orderId}`,{
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
        return fetch(`${URL_PREFIX}/api/orders/${orderId}`,{
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
    getUserOrder:(token, basketId)=>{
        return fetch(`${URL_PREFIX}/api/orders/basket/${basketId}`, {
            method: 'GET',
            headers: {
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>{
            if(!res.ok){
                throw new Error("can't get orders")
            }
            return res.json()
        })
    },
    getOneCategory: (categoryId)=>{
        return fetch(`${URL_PREFIX}/api/categories/${categoryId}`,{
            method: 'GET',
        }).then(res=>{
            if(!res.ok){
                throw new Error("unable to get this category")
            }
            return res.json()
        })
    },
    getCategories: ()=>{
        return fetch(`${URL_PREFIX}/api/categories`,{
            method: 'GET',
        }).then(res=>{
            if(!res.ok){
                throw new Error("unable to get this category")
            }
            return res.json()
        })
    },
    getCategoryByName: (categoryName)=>{
        fetch(`${URL_PREFIX}/api/categories/sub/${categoryName}`, {
            method: 'GET',
        }).then(res=>{
            if(!res.ok){
                throw new Error('something went wrong')
            }
            return res.json()
        })
    },
    getCategoryBySub: (categoryName)=>{
        fetch(`${URL_PREFIX}/api/products/cat/${categoryName}`, {
            method: 'GET',
        }).then(res=>{
            if(!res.ok){
                throw new Error('something went wrong')
            }
            return res.json()
        })
    },
    postReview:(token,reviewObj)=>{
        return fetch(`${URL_PREFIX}/api/reviews`,{
            method:"POST",
            body:JSON.stringify(reviewObj),
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
    getOneReview: (token, reviewId)=>{
        return fetch(`${URL_PREFIX}/api/reviews/${reviewId}`, {
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
    editReview:(token,reviewId,reviewObj)=>{
        return fetch(`${URL_PREFIX}/api/reviews/${reviewId}`,{
            method:"PUT",
            body:JSON.stringify(reviewObj),
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
    deleteReview:(token,reviewId)=>{
        return fetch(`${URL_PREFIX}/api/reviews/${reviewId}`,{
            method:"DELETE",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>{
            if(!res.ok){
             throw new Error("cannot delete")
            }
            return res.json()
          })
    },
    getProductReviwes: (productId)=>{
        return fetch(`${URL_PREFIX}/api/reviews/product/${productId}`, {
            method: 'GET',
        }).then(res=>{
            if(!res.ok){
                throw new Error('something went wrong')
            }
            return res.json()
        })
    },
    postNotification:(noteObj)=>{
        return fetch(`${URL_PREFIX}/api/notification`,{
            method:"POST",
            body:JSON.stringify(noteObj),
            headers:{
                "Content-Type":"application/json",
            }
        }).then(res=>{
            if(!res.ok){
             throw new Error("cannot create")
            }
            return res.json()
          })
    },
    getProductNotification: (productId)=>{
        return fetch(`${URL_PREFIX}/api/notification/product/${productId}`, {
            method: 'GET',
        }).then(res=>{
            if(!res.ok){
                throw new Error('something went wrong')
            }
            return res.json()
        })
    },



}
export default API

