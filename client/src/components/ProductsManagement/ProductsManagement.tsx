import ProductForm from './ProductForm'
import BackofficeHeader from '../shared/BackofficeHeader'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { fetchProducts } from '../../features/product/productSlice';

function ProductsManagement() {
  const dispatch = useAppDispatch();

  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch  ]);

  return (
    <div className=' relative  h-screen'>
      <BackofficeHeader currentPage="Products" />
        <ProductForm />
    </div>
  )
}

export default ProductsManagement
