import ProductForm from './ProductForm'
import BackofficeHeader from '../shared/BackofficeHeader'

function ProductsManagement() {
  return (
    <div className=' relative  h-screen'>
      <BackofficeHeader currentPage="Products" />
        <ProductForm />
    </div>
  )
}

export default ProductsManagement
