import {useEffect,useState,useContext} from 'react'
import { useParams } from 'react-router-dom';
import {context} from '../../App.jsx'
import Navbar from '../Navbar';
import CheckUserAuthentication from '../CheckUserAuthentication'

import './DetailedViewindex.css'
const DetailedView = ()=>{
    
    const {updateCartList,cartlist,increaseQuantity} = useContext(context)
    const id = useParams().id
    const [detaileddata,setdetaileddata] = useState({})
    const [view,setview] = useState("loading")

    const addToCart = (detaileddata)=>{
        
        if(cartlist.length===0){
            updateCartList({...detaileddata,quantity:1})
            alert("Item added to cart")
        }
        else {
            const filteredcartlist = cartlist.filter((each)=>(each._id===detaileddata._id));
            if(filteredcartlist.length===0){
               updateCartList({...detaileddata,quantity:1})
               alert("Item added to cart")
            }else{
            increaseQuantity(1,detaileddata._id)
            alert("Item already in cart increasing quantity of item");
        }
    }
    
   }

    const getDetailedData = async()=>{
        
        //    const response = await fetch(`http://localhost:4005/item/getDetailedView/${id}`);
        const response = await fetch(`https://deliciousfooddeliverappbackend.onrender.com/item/getDetailedView/${id}`);
           const data = await response.json();
        
           setdetaileddata(data)
           if(response.ok === true){
            setview("success")
           }
           else{
            setview("failed")
           }
    }

    useEffect(()=>{
              getDetailedData()
    },[id])



    return(
        <div>
        <Navbar/>
        
        <div className="detailedView">
        {view==="loading" ? (<p className="Loading">Loading...</p>) :
        view==="success" ? (
            <div className="showview">
                    <img src={detaileddata.img} alt="detailedImage" className="detailimg"/>
                    <h1 className="detailtitle">{detaileddata.title}</h1>
                    <p ><span className="span">Description</span><span className="detailDescription">{detaileddata.description}</span></p>
                    <p><span className="span">Price</span>{detaileddata.offer}Rs<span className="originalprice">{detaileddata.originalPrice}Rs</span></p>
                    <p><span className="span">Category</span>{detaileddata.category}</p>
                    <button type="button" className="detailAddToCart" onClick={() => addToCart(detaileddata)}>Add To Cart</button>
            </div>
        ) : view === "failed" && (<div>
            <h1>There is some error</h1>
            </div>)}
        </div>
        </div>
    )
}

export default CheckUserAuthentication(DetailedView)