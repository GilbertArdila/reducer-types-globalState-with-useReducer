import { useReducer } from "react";
import { initialState,productsReducer } from "../reducers/producsReducer";
import { productsContext } from "../reducers/producsReducer";


const ProductsProvider = ({children}) => {

    const [state,dispatch] = useReducer(productsReducer,initialState);

    return(
        <productsContext.Provider value={[state,dispatch]}>
            {children}
        </productsContext.Provider>
    )
};

export {ProductsProvider}