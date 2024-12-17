import { useState, useEffect } from 'react';
import './profileindex.css';
import Navbar from '../Navbar'
import {Navigate} from 'react-router-dom'
import CheckUserAuthentication from '../CheckUserAuthentication'


const Profile = () => {
  const id = localStorage.getItem("id");


  const [profileData, setProfileData] = useState({});
  const [newNumber, setNewNumber] = useState('');
  const [presentAddress, setPresentAddress] = useState("");
  const [numberEdit, setNumberEdit] = useState(false); 
  const [addressEdit, setAddressEdit] = useState(false);

  const getProfileDetails = async () => {
    // const response = await fetch(`http://localhost:4005/user/getUserdetails/${id}`);
    const response = await fetch(`https://deliciousfooddeliverappbackend.onrender.com/user/getUserdetails/${id}`);
    const data = await response.json();
    setProfileData(data);
    setNewNumber(data.number || ''); 
    setNumberEdit(data.number !== undefined); 
    setPresentAddress(data.address || "");
    setAddressEdit(data.address !== undefined);
  };

  const changeAddress = async () => {
    if(presentAddress !== null && presentAddress !== '' ){
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({ presentAddress, id })
      };
  
      // const response = await fetch("http://localhost:4005/user/updateAddress", options);
      const response = await fetch("https://deliciousfooddeliverappbackend.onrender.com/user/updateAddress", options);
      const data = await response.json();
  
      getProfileDetails(); 
      setAddressEdit(true);
    }
    else{
      alert("Enter correct address details")
    }
    
  };

  const changeNumber = async () => {
    if(!isNaN(newNumber) && newNumber !== null && newNumber !== '' && newNumber.length===10){
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({ newNumber, id })
      };
  
      // const response = await fetch("http://localhost:4005/user/updateNumber", options);
      const response = await fetch("https://deliciousfooddeliverappbackend.onrender.com/user/updateNumber", options);
      const data = await response.json();
      getProfileDetails(); 
    }
    else{
      alert("Enter correct Number details")
    }
    
  };

  useEffect(() => {
    if(id!==null){
      getProfileDetails();
    }
    
  }, [id]);

  

  return (
    <div>
    <Navbar/>
    <div className="profilepage">
    
      <div className="nameEmail">
        <p><span className="profileSpan">Username : </span>{profileData.username}</p>
        <p><span className="profileSpan">Email : </span>{profileData.email}</p>
      </div>
      <div className="phoneAddress">
        {numberEdit ? (
          <div className="adddetails">
            <p className="number"><span className="editspan">Number : </span>{profileData.number}</p>
            <button className="addbutton" onClick={() => setNumberEdit(false)}>Edit Number</button>
          </div>
        ) : (
          <div className="adddetails">
            <input
              className="addinput"
              type="text"
              placeholder="Enter number"
              onChange={(e) => setNewNumber(e.target.value)}
              value={newNumber}
            />
            <button className="addbutton" onClick={changeNumber}>Save Number</button>
          </div>
        )}
        {addressEdit ? (
          <div className="adddetails">
            <p className="number"><span className="editspan">Address : </span>{profileData.address}</p>
            <button className="addbutton" onClick={() => { setAddressEdit(false);}}>Edit Address</button>
          </div>
        ) : (
          <div className="adddetails">
            <textarea
            type="text"
              className="addinput"
              placeholder="Enter address"
              onChange={(e) => setPresentAddress(e.target.value)}
              value={presentAddress}
            />
            <button className="addbutton" onClick={changeAddress}>Save Address</button>
          </div>
        )}
      </div>
      <div className="contact">
        <p>For any query</p>
        <p><span className="profileSpan">Call :</span> 9999911111</p>
        <p><span className="profileSpan">Email : </span>deliciousservice@gmail.com</p>
      </div>
    </div>
    </div>
  );
};

export default CheckUserAuthentication(Profile);
