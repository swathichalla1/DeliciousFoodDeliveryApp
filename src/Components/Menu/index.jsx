import Navbar from '../Navbar';
import './menuIndex.css';
import EachProduct from '../EachProduct';
import { useState, useEffect } from 'react';
import {Navigate} from 'react-router-dom'
import CheckUserAuthentication from '../CheckUserAuthentication'

const categories = ["Desserts", "Snacks", "Combo","Drinks", "Meals", "Breakfast", "Salads"];

const Menu = () => {

  const token = localStorage.getItem('jwttoken');
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [price, setPrice] = useState(50);
  const [initialFoodList, setInitialFoodList] = useState([]);
  const [filteredFoodList, setFilteredFoodList] = useState([]);
  
  // Fetch the item details from the server
  const getItemDetails = async () => {
    const response = await fetch("http://localhost:4005/item/getItems");
    const data = await response.json();
    // console.log(data);
    setInitialFoodList(data); // Set the initial food list
  };

  // Fetch items on component mount
  useEffect(() => {
    getItemDetails();
  }, []);

  // Add or remove categories from the selected list
  const addOrRemoveFromCategory = (each) => {
    if (selectedCategory.includes(each)) {
      const newlist = selectedCategory.filter((category) => category !== each);
      setSelectedCategory(newlist);
    } else {
      setSelectedCategory([...selectedCategory, each]);
    }
  };

  // Filter items based on selected categories
  useEffect(() => {
    if (selectedCategory.length === 0) {
      const filteredList = initialFoodList.filter((item)=>(
            item.offer>=price
      ))
      setFilteredFoodList([...filteredList]); 
    } else {
      const filteredItems = initialFoodList.filter((item) => 
        selectedCategory.includes(item.category) && item.offer >= price 
      );
      setFilteredFoodList(filteredItems);
    }
  }, [selectedCategory, price, initialFoodList]); 

  return (
    <>
      <Navbar />
      <div className="menuContainer">
        <div className="categoryPrice">
          <div>
            <h6 className="heading">Select required category</h6>
            <ul className="showcategories">
              {categories.map((each, index) => {
                const clsName = selectedCategory.includes(each) ? "selectedcategory" : "eachCategory";
                return (
                  <li 
                    className={clsName} 
                    key={index} 
                    onClick={() => addOrRemoveFromCategory(each)}
                  >
                    {each}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="range">
            <label htmlFor="range" className="heading bold">Select The Price Range Of Items</label>
            <div className="inputrange">
              <span>1Rs</span>
              <input 
                type="range" 
                id="range" 
                min="0" 
                max="1000" 
                value={price} 
                onChange={(e) => setPrice(Number(e.target.value))} 
              />
              <span>1000Rs</span>
            </div>
            <p>{`Searching items starting from ${price} Rs`}</p>
          </div>
        </div>

        <div >
          {filteredFoodList.length === 0 ? (
            <div className="itemUnavailable">
            <h1>Sorry, currently we are not serving orders <br/>with your requirements!</h1>
            </div>
            
          ) : (
            <ul className="showAllItems">
              {filteredFoodList.map((item) => (
                <EachProduct details={item} key={item._id}/>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckUserAuthentication(Menu);
