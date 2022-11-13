import {useEffect, useState,useContext } from 'react';
import { productsContext } from './reducers/producsReducer';
import { GET_PRODUCTS, SHOW_ACTIVE_PRODUCT, ADD_PRODUCT_TO_CART, HIDE_ACTIVE_PRODUCT} from './types/types';
import axios from "axios";
import './styles/Products.css';
import './styles/Preview.css'
import {Searcher} from './searcher/Searcher';
import { LoaderSpiner } from './loader/LoaderSpiner';


const ProductsApp = () => {
    const [searchedProduct, setsearchedProduct] = useState('');
    const [showCart, setShowCart] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const [state, dispatch] = useContext(productsContext);
    const { products,  activeProduct } = state;

   

    useEffect(() => {

        getProducts()

    }, [])

    //doing fetch to get the products
    const getProducts = async () => {
        await axios.get('https://api.escuelajs.co/api/v1/products')
            .then((response) => dispatch({
                type: GET_PRODUCTS,
                payload: response.data
            }))
    }

    const handleShowActiveProduct = (id) => {
        dispatch({
            type: SHOW_ACTIVE_PRODUCT,
            payload: id
        });
        setShowDetails(true);

    };

    const handleHideActiveProduct = () => {

        dispatch({
            type: HIDE_ACTIVE_PRODUCT

        });

    };

    const handleAddProductToCart = (id) => {


        dispatch({
            type: ADD_PRODUCT_TO_CART,
            payload: id

        });
        setShowCart(true)


    };

    const productSearched = products.filter((product) => {
        return(
            product.title.toLowerCase().includes(searchedProduct.toLowerCase()) || product.category.name.toLowerCase().includes(searchedProduct.toLowerCase())
        )
    });
    

    return (
        <>
        <Searcher value={searchedProduct} onChange={(e)=>setsearchedProduct(e.target.value)}/>
        <div className='Products'>
            <h2>Products</h2>
            <section className='Products-container'>
                {!products.length ? <LoaderSpiner/>: productSearched.map((product) => (
                    //checking the image exist to render the product
                    product.images[0].includes('https://') ?

                        <div key={product.id} className='Product-container'>

                            <img src={product.images[0]} alt={product.title} className='Product-container_image' />

                            <h3 className='Product-container_title'><span className='titles'>Product:{' '}</span>{product.title}</h3>

                            <p className='Product-container_description'><span className='titles'>Description:{' '}</span>{product.description}</p>

                            <p className='Product-container_category'><span className='titles'>Category:{' '}</span>{product.category.name}</p>

                            <p className='Product-container_price'><span className='titles'>Price:{' '}</span>{product.price}</p>


                            <button className='btn show'
                                onClick={() => handleShowActiveProduct(product.id)}>Show details</button>

                            <button className='btn add' onClick={() => handleAddProductToCart(product.id)}>Add to cart</button>
                        </div> : null
                ))}
                
            </section>

            


            {activeProduct.id !== undefined && showDetails ? <div className='Preview' >
               
                 <h2>Product preview</h2>
                <span
                className='Preview-container_close'
                onClick={handleHideActiveProduct}>X</span>

                <div className="Preview-container">
                      <img className='Preview-container_images' src={activeProduct.images[0]} alt={activeProduct.title} />
                <img className='Preview-container_images' src={activeProduct.images[1]} alt={activeProduct.title} />
                <img className='Preview-container_images' src={activeProduct.images[2]} alt={activeProduct.title} />
                <div className='Preview-container_info'>
                    <h3 className='Preview-container_title'>Product:{' '}{activeProduct.title}</h3>
                    <p className='Preview-container_price'>Price:{' '}{activeProduct.price}</p>
                    <p className='Preview-container_category'>Category:{' '}{activeProduct.category.name}</p>
                     <p>{activeProduct.title}</p>
                </div>
                </div>
              

                
            </div> : null}

        </div>
        </>
    )
}
export { ProductsApp };