import ProductForm from './ProductForm'
import BackofficeHeader from '../shared/BackofficeHeader'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { fetchProducts } from '../../features/product/productSlice';
import ProductDisplay from './ProductDisplay';
import { AppDispatch } from '../../store/store';

function ProductsManagement() {
  const dispatch: AppDispatch = useAppDispatch();

  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch  ]);

  return (
    <div className='   h-screen'>
      <BackofficeHeader currentPage="Products" />
      <div className='h-screen  overflow-auto  hide-scrollbar ' >
        <ProductForm />
        <ProductDisplay />

      </div>
    </div>
  )
}

export default ProductsManagement
