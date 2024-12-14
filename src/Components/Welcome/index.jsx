import './index.css'
import {Link} from 'react-router-dom'

const Welcome = ()=>{
       return(
        <div className="HomeContainer">
              <div className="LogoAndPicture">
                    <img src="https://res.cloudinary.com/dewfecih3/image/upload/v1731831260/Screenshot_2024-01-25_184150_gcuiyy.png" alt="WebliteLogo" className="WebliteLogo"/>
                    <div className="foodLogoInSmallDevices">
                    <img src="https://res.cloudinary.com/dewfecih3/image/upload/v1731830724/Screenshot_2024-11-17_101045_o2i9vc.png" alt="FoodImage" className="FoodImage"/>
                    </div>
                    <div className="SignForm">
                    <Link to="/SignUpPage">
                    <button className="Signupbutton">Sign Up</button>
                    </Link>
                    <Link to="/SignInPage"><p>Already had an account! Click here to Sign In</p></Link>
                    
                    </div>

              </div>
              <div className="foodLogo">
              <img src="https://res.cloudinary.com/dewfecih3/image/upload/v1731830724/Screenshot_2024-11-17_101045_o2i9vc.png" alt="FoodImage" className="FoodImage"/>
              </div>
        </div>
       )
}

export default Welcome