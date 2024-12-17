import React from 'react'
import './notFound.css'
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="notFound">
    <img src="https://res.cloudinary.com/dewfecih3/image/upload/v1734354066/Screenshot_2024-12-16_182856_p0usl0.png" className="notfoundimg" alt="NotFoundImg"/>
    <Link to="/HomePage"><button className="pagebutton" type="button">Go Back To Home Page</button></Link> 
    
    </div>
  )
}

export default NotFound
