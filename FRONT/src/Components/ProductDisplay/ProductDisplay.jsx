import React, { useContext } from 'react';
import './ProductDisplay.css'
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = ({ product }) => {
    const { addToCart } = useContext(ShopContext);

    // Directly use the provided product properties.
    // Ensure these match with your actual product object structure.
    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
<<<<<<< HEAD
                    <img src={`http://localhost:4000/${product.img}`} alt={product.nom} className='productdisplay-main-img'/>
=======
                    <img src={`http://192.168.1.42:4000/${product.img}`} alt={product.nom} className='productdisplay-main-img'/>
>>>>>>> e9d59a900aec3130e8399437d8de9f15113fa447

                    {/* If you have more images, list them here */}
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.nom}</h1>
                <div className="productdisplay-right-prices">
                    {/* Assuming product.old_price exists */}
                    {product.old_price && <div className="productdisplay-right-price-old">{product.old_price} €</div>}
                    <div className="productdisplay-right-price-new">{product.prix} €</div>
                </div>
                {/* Assuming product.description exists */}
                {product.description && <div className="productdisplay-right-description">{product.description}</div>}
                <button onClick={() => addToCart(product.puid)}>Ajouter au panier</button>
            </div>
        </div>
    );
};


export default ProductDisplay;
