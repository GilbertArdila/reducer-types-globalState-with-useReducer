import React,{useState} from 'react';
import { Cart } from './products/cart/Cart';
import {NavBar} from './products/menu/NavBar';
import { ProductsApp } from "./products/ProductsApp";
import { ProductsProvider } from './products/provider/ProductsProvider';


function App() {
  const [showPage, setShowPage] = useState(false);
 
  return (
    <div className="App">
      <ProductsProvider>
         <NavBar setShowPage={setShowPage} showPage={showPage}/>
      
      {showPage ? <Cart />:<ProductsApp/> }
      </ProductsProvider>
     
     
    </div>
  )
}

export default App
