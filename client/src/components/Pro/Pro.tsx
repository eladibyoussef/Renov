import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StarRating from './StarRating'; 
import cart1 from "../../Assets/1.png";
import cart2 from "../../Assets/2.png";
import cart3 from "../../Assets/3.png";
import cart4 from "../../Assets/4.png";

const categories = [
  { name: 'jean biter', rating: 4, imgSrc: cart1 },
  { name: 'gorge Ferraro', rating: 3, imgSrc: cart2 },
  { name: 'Grey fatter', rating: 5, imgSrc: cart3 },
  { name: 'luster jeon', rating: 2, imgSrc: cart4 },
];

const Pro = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    beforeChange: (current, next) => setActiveIndex(next), 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  const handlePrevious = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div className="w-full"> 
      <div className="bg-[#5389C8] text-black font-bold py-8 px-4 flex justify-between items-center">
        <div className="text-lg font-semibold">
          Maroua, thank you for considering RENOVO.
        </div>
        <div className="text-sm text-right">
          <p className="mb-2">Question?</p>
          <p className="mb-2">Contact phone Number</p>
          <p className="mb-2">+212 67890876</p>
        </div>
      </div>
      <h2 className="text-3xl font-bold text-center my-6">
        <span className="text-blue-500">Recommended</span> Pro by RENOVO
      </h2>
      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {categories.map((category, index) => (
            <div key={index} className="w-full px-2 sm:w-1/2 md:w-1/3 lg:w-1/5">
              <section className="py-6 md:py-12 lg:py-16">
                <div className="container grid gap-8 px-4 md:px-6">
                  <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-950 border-gray-100">
                    <div className="flex flex-col items-center p-4 sm:p-6">
                      <StarRating value={category.rating} onChange={(rating) => {}} />
                      <h3 className="font-semibold text-base sm:text-lg">{category.name}</h3>
                      <img
                        alt={category.name}
                        className="rounded-full"
                        height={128}
                        src={category.imgSrc}
                        style={{
                          aspectRatio: '1/1',
                          objectFit: 'cover'
                        }}
                        width={128}
                      />
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded mt-2"
                        onClick={() => {
                        }}
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ))}
        </Slider>
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-300 rounded text-black font-bold hover:bg-gray-700 hover:text-white"
        >
          {'<'}
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-300 text-black rounded font-bold hover:bg-gray-700 hover:text-white"
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default Pro;
