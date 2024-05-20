import React from 'react';
import { Carousel } from 'antd';

const ProductsCarousel: React.FC = () => (
  <Carousel autoplay>
    <div>
      <img
        src="https://cdn.shopify.com/s/files/1/1805/8667/articles/top-must-have-home-renovation-products-for-a-complete-home-makeover-megafurniture.jpg?v=1688094482"
        alt="Product 1"
        className="w-full h-40 object-cover"
      />
    </div>
    <div>
      <img
        src="https://azbigmedia.com/wp-content/uploads/2020/08/Home-Improvement-Projects.png"
        alt="Product 2"
        className="w-full h-40 object-cover"
      />
    </div>
    <div>
      <img
        src="https://thumbs.dreamstime.com/z/house-renovation-implements-set-building-painting-repair-wooden-table-background-top-view-mockup-house-renovation-99248554.jpg"
        alt="Product 3"
        className="w-full h-40 object-cover"
      />
    </div>
    <div>
      <img
        src="https://example.com/path/to/your/image4.jpg"
        alt="Product 4"
        className="w-full h-40 object-cover"
      />
    </div>
  </Carousel>
);

export default ProductsCarousel;
