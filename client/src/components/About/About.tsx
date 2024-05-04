import React from 'react';
import plumber from '../../Assets/plumber.png';

function About() {
  return (
    <div className=" bg-white  ">
      <div className="container p-8">
        
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-2/3 text-center md:text-left md:self-start ">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-playfair font-bold leading-normal text-gray-800 mt-10 mb-6 md:mb-8 ">
                Why we are the best
              </h1>
              
              <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-3xl font-cursive text-black md:mt-4 mb-4 md:mb-6 lg:mt-14">
                Our Philosophy
              </h2>
              
              <p className="text-base md:text-lg lg:text-lg xl:text-2xl font-inter text-black text-center leading-relaxed  mt-6">
                We adhere to a simple yet comprehensive approach.
                Offering competitive rates, we deploy skilled professionals  
                in plumbing, painting, electrical work, and more. Transparency is key; there are no hidden fees. Backed by a 100% guarantee on workmanship, we're committed to excellence. Whether it's fixing leaks, giving your space a fresh coat of paint, handling electrical installations, or other tasks, our team is ready to cater to your home or business needs promptly.
              </p>
            </div>
          </div>
          
          <div className="md:w-1/3 mt-8 md:mt-0 md:ml-8">
            <img src={plumber} alt="Plumber" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
