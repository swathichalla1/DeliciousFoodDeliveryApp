import "./Navbarindex.css"
import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { IoMdClose } from "react-icons/io";


const Navbar = ()=>{
    const [show,setshow] = useState(false)

    const navigate = useNavigate()

    const logout = ()=>{
        localStorage.removeItem("jwttoken")
        localStorage.removeItem("id");
        return navigate("/", { replace: false })
    }
    return(
        <>
        <div className="NavbarContainer">
        <img className="navbarimage" src="https://res.cloudinary.com/dewfecih3/image/upload/v1731831260/Screenshot_2024-01-25_184150_gcuiyy.png" alt="WebsiteLogo"/>
        <ul className="navbarlist">
        <Link to="/HomePage" style={{textDecoration:"none"}}><li className="eachlist">Home</li></Link>
        
        <Link to="/Menu" style={{textDecoration:"none"}}><li className="eachlist">Menu</li></Link>
        <Link to="/profile" style={{textDecoration:"none"}}><li className="eachlist">Profile</li></Link>
        <Link to="/Cart" style={{textDecoration:"none"}}><li className="eachlist">Cart</li></Link>
        
        </ul>
        <button className="Logoutbutton" onClick={logout}>Logout</button>
        
        <ul className="navbarinsmalldevices">
        <li className="listitemsinsmalldevices" onClick={()=>(setshow(!show))}><GiHamburgerMenu /></li>
        <Link to="/Cart"><li className="listitemsinsmalldevices"><FaShoppingCart /></li></Link>
        <li className="listitemsinsmalldevices" onClick={logout}><MdLogout /></li>
        </ul>
        </div>
        {show && ( <ul className="showsidebar">
            <li className="sidebartabs icon" onClick={()=>(setshow(false))}><IoMdClose /></li>
            <Link to="/Menu" style={{textDecoration:"none",color:"white"}}><li className="sidebartabs">Menu</li></Link>
            <Link to="/Profile" style={{textDecoration:"none",color:"white"}}><li className="sidebartabs">Profile</li></Link>
       </ul>)}
       
        
        </>
    )
}

export default Navbar