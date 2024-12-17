import './SignIn.css'
import {useState} from 'react'
import {useNavigate,Navigate} from 'react-router-dom'


const SignInPage = ()=>{
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    const [error,seterror] = useState(false)
    const [errorMsg,seterrorMsg] = useState("")
    const [successMsg,setsuccessMsg] = useState("")
    const [loading,setLoading] = useState(false)

    const navigate = useNavigate()

    const token = localStorage.getItem("jwttoken");

    const details = {email,password}

    

    const onSubmitSuccess=(data)=>{
      setLoading(false)
      seterror(false)
      const jwtToken = data.jwtToken 
      const id = data.id
      localStorage.setItem('id', id)
      localStorage.setItem("jwttoken",jwtToken,{expires:30})
      setsuccessMsg(data.message)
      setpassword("")
      setemail("")
      navigate("/HomePage")

    }

    const onSubmitFailure = (err)=>{
      setLoading(false)
      seterror(true)
      seterrorMsg(err)

    }

    const SubmitSignInForm = async(e)=>{
           e.preventDefault()
           try{
            let options = {
            method:"POST",
            headers:{
              "Content-Type":"application/json",
            "accept":"application/json",
            },
            
            body:JSON.stringify({details})
         }
          //  let response = await fetch("http://localhost:4005/user/login",options);
           let response = await fetch("https://deliciousfooddeliverappbackend.onrender.com/user/login",options)
           let data = await response.json()
           

           if(response.ok===true){
            onSubmitSuccess(data)

           }
           else{
            onSubmitFailure(data.message)
            
           }
          }catch(e){
            setLoading(false)
            seterror(true)
            seterrorMsg("Something went wrong try again!")
          }

    }

    if(token !== null){
      return <Navigate to="/HomePage"/>
    }

    return(
        <div className="SignInContainer">
        <h1 className="SignInheading">Sign In Here</h1>
        <form className="SignInForm" onSubmit={SubmitSignInForm}>
        <div className="eachfield">
        <label className="label" htmlFor="Email">Email</label>
        <input className="inputField" type="text" id="Email" placeholder="Email" onChange={(e)=>(setemail(e.target.value))}/>
        </div>
        <div className="eachfield">
        <label className="label" htmlFor="Password">Password</label>
        <input className="inputField" type="password" id="Password" placeholder="Password" onChange={(e)=>(setpassword(e.target.value))}/>
        </div>
        <button className="SignInbutton" type="submit">Sign In</button>    
        </form>
        {loading && (<p className="errmsg">.....Loading</p>)}
        {error ? (<p className="errmsg">{errorMsg}</p>) : (<p className="errmsg">{successMsg}</p>)}
        </div>
        
    )
}

export default SignInPage