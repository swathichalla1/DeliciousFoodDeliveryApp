import {Navigate} from 'react-router-dom'

const CheckUserAuthentication = (Component)=>{

    return function checkingAuth(props){
        const token = localStorage.getItem("jwttoken");
        if(token === null){
            return <Navigate to="/"/>
        }
        
            return <Component {...props}/>
        
    }
    
}

export default CheckUserAuthentication