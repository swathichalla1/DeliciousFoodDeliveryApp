import './EachProduct.css'
import {Link} from 'react-router-dom'


const EachProduct = (props)=>{
    
    const {details} = props 
    const {title,img,offer,_id} = details 
    

    

    return(

        <Link to={`/DetailedView/${_id}`} className="detailedview">
        <div className="itemContainer">
                   <img src={img} alt={title} className="dish"/>
                   <h4 className="title">{title}</h4>
                   <p className="offer">{`Price : ${offer}/-`}</p>
                   
        </div>
        </Link>
    
    )

}

export default EachProduct 