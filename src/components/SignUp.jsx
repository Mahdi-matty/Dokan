import { useState } from "react"

 const SignUp= (props)=>{
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
 
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        props.subHandle({
          username,
          email,
          password,
        })
      }
    return (
        <>
        <div>
          <form onSubmit={handleFormSubmit}>
          <input
            value={username}
            name="username"
            onChange={e=>setUserName(e.target.value)}
            type="text"
            placeholder="username"
          />
          <input
            value={email}
            name="email"
            onChange={e=> setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            value={password}
            name="password"
            onChange={e=> setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <button type="submit">
            Submit
          </button>
          </form>
        </div>
        </>
    )
    }
    export default  SignUp;