import React from 'react'
import {useContext,useState,useEffect} from 'react'
import {context} from '../../App.jsx'
import ShowEachCartItem from '../ShowEachCartItem'
import './cartindex.css'
import Navbar from '../Navbar'
import {Link,Navigate} from 'react-router-dom'
import CheckUserAuthentication from '../CheckUserAuthentication'

const Cart = () => {
    const token = localStorage.getItem("jwttoken");
    const {cartlist,ResetCart} = useContext(context);
    console.log("cartlist from cart : ",cartlist);
    const [total,setTotal] = useState(0);

    useEffect(()=>{
      let totalSum = 0;
      for(let each of cartlist){
        totalSum += (each.offer*each.quantity)
      }
      setTotal(totalSum);
    },[cartlist])


  return (
    <div>
    <Navbar/>
    {cartlist.length === 0 ? (<div className="noItemsInCart"><h1>No Items Added To Cart!</h1><Link to="/Menu">
      <button className="ordernow">Order Now</button>
      </Link></div>): ( <div className="cartConainer">
      <button type="button" className="resetbutton" onClick={ResetCart}>Reset Cart</button>
        <ul>{cartlist.map((each)=>(
          <ShowEachCartItem key={each._id} details={each}/>
        ))}</ul>
        <p className="totalCart">{`Total cart value : ${total}/-`}</p>
        <button className="checkout">CheckOut</button>
      </div>)}
      
    </div>
  )
}

export default CheckUserAuthentication(Cart)
