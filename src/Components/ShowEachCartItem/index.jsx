import React,{useState} from 'react'
import './showeachcartitem.css'
import {useContext} from 'react'
import {context} from '../../App.jsx'

const ShowEachCartItem = (props) => {
    
    const {details} = props;
    const [newQuantity,setNewQuantity] = useState(details.quantity)
    const {cartListAfterDeletion,increaseQuantity} = useContext(context)

    const increasingQuantity = ()=>{
      setNewQuantity(newQuantity+1)
      increaseQuantity(1,details._id)
    }

    const decreaseQuantity = ()=>{
      if(newQuantity>1){
        setNewQuantity(newQuantity-1)
        increaseQuantity(-1,details._id)
      }
      else{
        cartListAfterDeletion(details._id)
      }
      
    }

  return (
    <div className="eachCartItem">
      <div className="imgcontainer">
      <p>{details.title}</p>
      <img src={details.img} alt="itemImage" className="cartimg"/>
      </div>
      <div className="quantityButtonContainer">
      <button type="button" onClick={increasingQuantity} className="quantitybutton">+</button>
      <p>Quantity<br/>{newQuantity}</p>
      <button type="button" onClick={decreaseQuantity} className="quantitybutton">-</button>
      </div>
      
      <p>{`Price : ${details.offer * newQuantity}`}</p>
    </div>
  )
}

export default ShowEachCartItem
