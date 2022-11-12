import { GET_PRODUCTS,SHOW_ACTIVE_PRODUCT, ADD_PRODUCT_TO_CART,HIDE_ACTIVE_PRODUCT,REMOVE_PRODUCT_FROM_CART,REMOVE_ONE_FROM_CART } from "../types/types";

export const initialState = {
    products: [],
    cart: [
        
    ],
    activeProduct: {},
    
}


export const productsReducer = (state,action) => {
    switch(action.type) {
        case GET_PRODUCTS:
           
            return{
             ...state,
               products:action.payload
            }
        
            
        case SHOW_ACTIVE_PRODUCT:
            return {
                ...state,
                activeProduct : state.products.find((product) => product.id === action.payload)
            };
        case HIDE_ACTIVE_PRODUCT:
            return{
                ...state,
                activeProduct:{}
            }; 
        case ADD_PRODUCT_TO_CART:{
            const newProduct = action.payload;
            const cartContainProduct = state.cart.find((product) => product.id === newProduct);

            return cartContainProduct ? {
                ...state,
                  cart:  state.cart.map((product) => product.id === newProduct ? {...product,quantity: product.quantity+1} : product
                  )
            
            } : 
            {
                ...state,
                //copiamos lo que ya estaba en el carrito
                cart: [
                    ...state.cart,
                   { ...state.products.find((product) => product.id === action.payload),quantity:1}
                ]
            };
        };
        case REMOVE_PRODUCT_FROM_CART:
            return{
                ...state,
                //retornamos los productos que no sean el elviado en el payload
                cart:  state.cart.filter((product) => product.id !== action.payload )
            };  
        case REMOVE_ONE_FROM_CART:{

            const productToDelete = state.cart.find((product) => product.id === action.payload);
            //la cantidad es mayor a uno
             return productToDelete.quantity >1 ?{
                ...state,
                //reduzca en uno
                cart: state.cart.map((product) => product.id === action.payload ?{...product,quantity: product.quantity-1} :product)
            }:{
                //la cantidad no es mayor a uno elimine
                ...state,
                cart:state.cart.filter((product) => product.id !== action.payload)
            };
        };  
       

        default:
            return state
    }
}