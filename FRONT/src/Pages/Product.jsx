import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';


const Product = () => {
  const { produits } = useContext(ShopContext);
  const { productId } = useParams();
  const product = produits.find(e => e.puid === productId);

  if (!produits.length) {
    return <div>Chargement des produits...</div>;
  } else if (!product) {
    return <div>Produit non trouvé.</div>;
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />

      <br /><br /><br />
    
    </div>
  );
};

export default Product;
