import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

const testimonialData = [
  {
    id: 1,
    name: "Samuel",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 2,
    name: "John Doe",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 3,
    name: "Smith",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/103/103",
  },
];

const Testimonial : React.FC = () => {
  const settings = {
    dots: false, 
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="py-10">
      <div className="container">
        <div className="text-center mb-8">
        <hr className="border-t-2 border-gray-300 w-1/2 mx-auto  md:my-4" />
          <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            What our customers say
          </p>
          <h1 className="text-3xl font-bold">Testimonial</h1>
          <p className="text-xs text-gray-400 mt-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Perspiciatis delectus architecto error nesciunt,
          </p>
        </div>
        <div className="max-w-screen-xl mx-auto relative">
          <Slider {...settings}>
            {testimonialData.map((data) => (
              <div key={data.id} className="px-4">
                <div className="flex flex-col justify-center items-center gap-4 text-center shadow-lg p-4 rounded-xl bg-gray-100 relative">
                  <img className="rounded-full block mx-auto w-28 h-28 mb-4" src={data.img} alt={data.name} />
                  <p className="text-gray-500 text-sm">{data.text}</p>
                  <h1 className="text-lg font-bold">{data.name}</h1>

                  <p className=" text-7xl font-serif  absolute top-0 right-0 text-black opacity-20 " style={{fontFamily:"serif"}}>,,</p>
                </div>
              </div>
            ))}
          </Slider>
          
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
