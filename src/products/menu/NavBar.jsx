import {useContext} from 'react';
import { productsContext } from '../reducers/producsReducer';
import '../styles/Navbar.css';

const NavBar = ({setShowPage,showPage}) => {
  const [state] = useContext(productsContext);
  const {cart} = state;

  return (
    <nav className='NavBar'>
      <h2>My Store</h2>
   
    {cart.length > 0 ? showPage ? <div className='cart' onClick={() => setShowPage(false)}><img src='https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_home_48px-64.png' alt='home' /></div>: <div className='cart'
    onClick={() => setShowPage(true)}
    ><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-cart-outline-64.png" alt="cart" /></div>: null}
    
    </nav>
  )
}

export  {NavBar}