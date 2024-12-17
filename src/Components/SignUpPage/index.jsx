import './index.css'
import {useState} from 'react'
import {useNavigate,Navigate} from 'react-router-dom'

const SignUpPage = ()=>{
    const [username,setusername] = useState("")
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    const [error,seterror] = useState(false)
    const [errorMsg,seterrorMsg] = useState("")
    const [successMsg,setsuccessMsg] = useState("")
    const [loading,setLoading] = useState(false)

    const navigate = useNavigate()
    const token = localStorage.getItem("jwttoken");

    const details = {username,email,password}

    const onSubmitSuccess=(msg)=>{
      setLoading(false)
      seterror(false)
      setsuccessMsg(msg)
      setpassword("")
      setusername("")
      setemail("")
      navigate("/SignInPage")

    }

    const onSubmitFailure = (err)=>{
      setLoading(false)
      seterror(true)
      seterrorMsg(err)

    }

    const SubmitSignUpForm = async(e)=>{
      seterrorMsg("")
          setLoading(true)
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
            //let response = await fetch("http://localhost:4005/user/register",options)
            let response = await fetch("https://deliciousfooddeliverappbackend.onrender.com/user/register",options)
             let data = await response.json()
             if(response.ok===true){
              onSubmitSuccess(data.message)
  
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
        <div className="SignUpContainer">
        <h1 className="Signupheading">Sign Up Here</h1>
        <form onSubmit={SubmitSignUpForm} className="SignUpForm">
        <div className="eachfield">
        <label  className="label" htmlFor="Username">Username</label>
        <input className="inputField" type="text" id="Username" placeholder="Username" onChange={(e)=>(setusername(e.target.value))}/>
        </div>
        <div className="eachfield">
        <label className="label" htmlFor="Email">Email</label>
        <input className="inputField" type="text" id="Email" placeholder="Email" onChange={(e)=>(setemail(e.target.value))}/>
        </div>
        <div className="eachfield">
        <label className="label" htmlFor="Password">Password</label>
        <input className="inputField" type="password" id="Password" placeholder="Password" onChange={(e)=>(setpassword(e.target.value))}/>
        </div>
        <button className="SignUpbutton" type="submit">Sign Up</button>    
        </form>
        {loading && (<p className="errmsg">.....Loading</p>)}
        {error ? (<p className="errmsg">{errorMsg}</p>) : (<p className="errmsg">{successMsg}</p>)}
        </div>
        
    )
}

export default SignUpPage