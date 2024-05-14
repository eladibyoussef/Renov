import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectAllProducts } from '../../features/product/productSlice';
import Swiper from './Swiper';


export default function ProductDisplay() {
  const products = useAppSelector(selectAllProducts);
   return (
    <div className=" grid grid-cols-4">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
          <p>Availability: {product.availability ? 'Available' : 'Not Available'}</p>
          {product.rentable && <p>Rentable</p>}
          <p>Delivery Fees: ${product.deliveryFees}</p>
          {/* <div className="product-photos">
            {product.photos.map((photo, photoIndex) => (
              <img key={photoIndex} src={photo} alt={`Product ${product._id} photo ${photoIndex + 1}`} />
            ))}
          </div> */}
          <Swiper photos={product.photos}/>
        </div>
      ))}
    </div>
  );
}
