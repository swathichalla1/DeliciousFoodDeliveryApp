import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {createContext,useState,useEffect} from 'react'
import './App.css'
import Welcome from './Components/Welcome'
import SignUpPage from './Components/SignUpPage'
import SignInPage from './Components/SignInPage'
import HomePage from './Components/HomePage'
import Menu from './Components/Menu'
import Profile from './Components/Profile'
import DetailedView from './Components/DetailedView'
import Cart from './Components/Cart'
import NotFound from './Components/NotFound'

export const context = createContext();

const App = ()=>{

  

  const [cartlist,setcartlist] = useState([])
  const [id,setid] = useState(localStorage.getItem('id') || null)

  const getCartlist = async()=>{
        //  const response = await fetch(`http://localhost:4005/user/getCartList/${id}`);
        const response = await fetch(`https://deliciousfooddeliverappbackend.onrender.com/user/getCartList/${id}`);
         const data = await response.json();
         setcartlist(data);
  }

  useEffect(()=>{
    if(id!==null){
      getCartlist()
    }
    
  },[id])

  const ResetCart = ()=>{
    setcartlist([]);
    updateDataToBackend([])
  }

  const cartListAfterDeletion = (id)=>{
          const afterItemDeletionList = cartlist.filter((each)=>(
            each._id !== id
          ));
          setcartlist(afterItemDeletionList);
          updateDataToBackend(afterItemDeletionList)
  }

  const updateDataToBackend = async(updatedCartList)=>{

    const options = {
      method:"PUT",
      headers:{
        "Content-Type" : "application/json",
        "accept" :"application/json"
      },
      body:JSON.stringify({updatedCartList,id})
    }
          //  const response = await fetch("http://localhost:4005/user/updateCartList",options);
           const response = await fetch("https://deliciousfooddeliverappbackend.onrender.com/user/updateCartList",options);
           const data = await response.json();
  }

  const updateCartList = (cartItem)=>{
    
    setcartlist([...cartlist,cartItem])
    updateDataToBackend([...cartlist,cartItem]);
   }

   const increaseQuantity = (quantity,id) => {
    const updatedCartList = cartlist.map(each => {
      if (each._id === id) {
        return ({ ...each, quantity: each.quantity + quantity });
      } else {
        return each;
      }
    });
     updateDataToBackend(updatedCartList);
    setcartlist(updatedCartList);
  };
  

  return(
    <BrowserRouter>
    <context.Provider value={{cartlist,id,updateCartList,increaseQuantity,ResetCart,cartListAfterDeletion}}>
    <Routes>
    <Route path="/" element={<Welcome/>}/>
    <Route path="/SignUpPage" element={<SignUpPage/>}/>
    <Route path="/SignInPage" element={<SignInPage/>}/>
    <Route path="/HomePage" element={<HomePage/>}/>
    <Route path="/Menu" element={<Menu/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/DetailedView/:id" element={<DetailedView/>}/>
    <Route path="/Cart" element={<Cart/>}/>
    <Route path="*" element={<NotFound/>}/>
    </Routes>
    </context.Provider>
    </BrowserRouter>
  )
}


export default App