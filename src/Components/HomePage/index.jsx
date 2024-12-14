import Navbar from '../Navbar'
import './Homeindex.css'
import {Link} from 'react-router-dom'
import CheckUserAuthentication from '../CheckUserAuthentication'

const HomePage = ()=>{
    return(
        <div className="homePageContainer">
            <Navbar/>
            <div className="homepageContainer">
            <h4 className="description">Get <br/><span className="Homespan">Fresh Food</span> <br/>with great <br/><span className="Homespan">Quality Quantity</span></h4>
                 <img src="https://res.cloudinary.com/dewfecih3/image/upload/v1732368633/Screenshot_2024-11-23_185954_lyojgt.png" alt="homepageimg" className="homepageimg"/>
                <Link to="/Menu">
                 <button className="ordernow">Order Now</button>
                 </Link>
            </div>
        </div>
            
        
    )

}

export default CheckUserAuthentication(HomePage)