import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gray-100 py-10 mx-10 mt-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Trending Products</h1>
        <Carousel showThumbs={false} autoPlay infiniteLoop>
          <div>
            <img src="https://cdn.shopify.com/s/files/1/1805/8667/files/Must-Have-Home-Renovation-Products-in-Singapore_1024x1024.jpg?v=1688005179" alt="Product 1" />
            <p className="legend">Product 1</p>
          </div>
          <div>
            <img src="https://www.windowworld.com/uploads/images/news/Tools-and-color-swatches-for-home-improvement-projects_window-world_hero-1920x1280-min-1.jpg" alt="Product 2" />
            <p className="legend">Product 2</p>
          </div>
          <div>
            <img src="https://media.licdn.com/dms/image/C4D12AQH6R0LhXyC9TQ/article-cover_image-shrink_600_2000/0/1574687765028?e=2147483647&v=beta&t=w6sXwdPqT58IdzcnMBIkTikC8YcTbA_tsTzrjtEr41M" alt="Product 3" />
            <p className="legend">Product 3</p>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default HeroSection;
