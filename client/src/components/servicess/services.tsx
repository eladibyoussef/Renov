import React, { useRef } from 'react'
import { FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import cart1 from "../../Assets/1.png"
import cart2 from "../../Assets/2.png"
import cart3 from "../../Assets/3.png"
import cart4 from "../../Assets/3.png"
import cart5 from "../../Assets/5.png"



const responsive = {
  superLargeDesktop: {
    breakpoint: {max:4000 , min: 3000},
    items: 4,
  },
  Desktop: {
    breakpoint: {max:2000 , min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: {max:1024 , min: 464},
    items: 3,
  },
  module: {
    breakpoint: {max:464 , min:0},
    items: 1,
  }
}

function Services ()  {
  const carouselRef = useRef();

  const handleNext = () => {
    if (carouselRef.current) carouselRef.current.next(0);
  };

  const handlePrevious = () => {
    if (carouselRef.current) carouselRef.current.previous(0);
  };

  return (
    <div className='container mx-auto px-6 py-16' data-aos-delay='300'>
      <div className='flex items-center justify-between mb-12'>
        <h2 className='font-black text-4xl'>OUR SERVICES LIST</h2>
        <div className='flex items-center gap-x-2'>
          <button onClick={handlePrevious} className='rounded-full p-2 border border-gray-200 hover:border-gray-500'>
            <FaArrowLeft />
          </button>
          <button onClick={handleNext} className='rounded-full p-2 border border-gray-200 hover:border-gray-500'>
            <FaArrowRight />
          </button>
        </div>
      </div>

      <Carousel
        responsive={responsive}
        ssr={true}
        infinite
        autoPlay={true}
        arrows={false}
        keyBoardControl={true}
        renderButtonGroupOutside={true}
        ref={carouselRef}
      >
        <div  className='p-6 rounded-xl bg-[whitesmoke]  hover:bg-sky-200 lg:ml-8'>
          <img src={cart1} alt="" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}/>
          <span className='py-4 px-6 '>
          <p className='text-xl font-bold mb-2'>Service 1</p>
          <button className=' bg-sky-800 text-white px-4 py-2 rounded-lg hover:bg-sky-400 hover:text-black transition-bg'>
            Visit Now
          </button>
          </span>
        </div>
        
        <div className='p-6 rounded-xl bg-[whitesmoke]  hover:bg-sky-200  lg:ml-8'>
          <img src={cart2} alt="" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}/>
          <span className='py-4 px-6 '>
          <p className='text-xl font-bold mb-2'>Service 2</p>
          <button className=' bg-sky-800 text-white px-4 py-2 rounded-lg hover:bg-sky-400 hover:text-black transition-bg'>
            Visit Now
          </button>
          </span>
        </div>
        <div className='p-6 rounded-xl bg-[whitesmoke] hover:bg-sky-200  lg:ml-8'>
          <img src={cart3} alt="" style={{ width: '800%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}/>
          <span className='py-4 px-6 '>
          <p className='text-xl font-bold mb-2'>Service 3</p>
          <button className=' bg-sky-800 text-white px-4 py-2 rounded-lg hover:bg-sky-400 hover:text-black transition-bg'>
            Visit Now
          </button>
           </span>
        </div>
        <div className='p-6 rounded-xl bg-[whitesmoke] hover:bg-sky-200  lg:ml-8'>
          <img src={cart4} alt="" style={{ width: '800%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}/>
          <span className='py-4 px-6'>
          <p className='text-xl font-bold mb-2'>Service 4</p>
          <button className=' bg-sky-800 text-white px-4 py-2 rounded-lg hover:bg-sky-400 hover:text-black transition-bg'>
            Visit Now
          </button>
           </span>
        </div>
       
        <div className='p-6 rounded-xl bg-[whitesmoke] hover:bg-sky-200  lg:ml-8'>
          <img src={cart3} alt="" style={{ width: '800%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}/>
          <span className='py-4 px-6 '>
          <p className='text-xl font-bold mb-2'>Service 5</p>
          <button className=' bg-sky-800 text-white px-4 py-2 rounded-lg hover:bg-sky-400 hover:text-black transition-bg'>
            Visit Now
          </button>
           </span>
        </div>
        <div className='p-6 rounded-xl bg-[whitesmoke]  hover:bg-sky-200  lg:ml-8'>
          <img src={cart5} alt="" style={{ width: '800%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}/>
          <span className='py-4 px-6 '>
          <p className='text-xl font-bold mb-2'>Service 6</p>
          <button className=' bg-sky-800 text-white px-4 py-2 rounded-lg hover:bg-sky-400 hover:text-black transition-bg'>
            Visit Now
          </button>
           </span>
        </div>
      </Carousel>
      <div className="mt-8 text-right">
        <button
          className="bg-gray-300 text-gray-800 px-6 py-1 shadow-xl rounded-lg border border-gray-200 hover:bg-gray-400 hover:text-gray-900 transition-bg"
          style={{ fontSize: '16px', fontWeight: 'bold', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}
        >
          View All Services
        </button>
      </div>
    </div>
  )
}

export default Services