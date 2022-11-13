import React, { useContext} from 'react';
import { productsContext } from '../reducers/producsReducer';
import { REMOVE_ONE_FROM_CART, REMOVE_PRODUCT_FROM_CART } from '../types/types';
import '../styles/Cart.css';

const Cart = () => {
    const [state,dispatch] = useContext(productsContext);
    const {cart} = state;

    const handleRemoveFromCart = (id) => {
        dispatch({
            type: REMOVE_PRODUCT_FROM_CART,
            payload: id
        });
    };

    const handleRemoveOneFromCart = (id) => {
        dispatch({
            type: REMOVE_ONE_FROM_CART,
            payload: id
        });
    };

    
  return (
    <div className='Cart'>
    <h2>Check out</h2>
    
    <ul>
        {cart.map((product) => (
            <div
                className='Cart-container'
                key={product.id}>

                  

                <img src={product.images[0]} alt={product.title}
                    className='Cart-container_image'
                />
                <div className="Cart-container_info">
                    <h3 className='Cart-container_title'>{product.title}- quantity: {product.quantity}</h3>

                    <span className='Cart-continer_price'>Price:{' '}{product.price}</span>

                    <p className='Cart-container_total'>Total:{' '}{parseInt(product.price) * parseInt(product.quantity)}</p>
                    
                </div>


                <button className='btn removeAll' onClick={() => handleRemoveFromCart(product.id)}>Remove all items from  cart</button>
                {product.quantity > 1 ? <button className='btn removeOne' onClick={() => handleRemoveOneFromCart(product.id)}>Remove one item from  cart</button> : null}
            </div>
        ))}
    </ul>
   
</div>
  )
}

export  {Cart}