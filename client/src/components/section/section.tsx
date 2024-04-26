import React from 'react';
import work1 from '../../Assets/work1.png';
import work2 from '../../Assets/work2.png';
import work3 from '../../Assets/work3.png';

const Section: React.FC = () => {
  return (
    <div className="bg-white p-8 md:p-12 lg:p-14 xl:p-16">
      <div className="container">
        <hr className="border-t-2 border-gray-300 w-1/2 mx-auto md:my-4" />
        <div className="text-center mb-8">
          <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          how we work
          </p>
          <h1 className="text-3xl font-bold">Easier than You Can Think!</h1>
          <p className="text-xs text-gray-400 mt-2">
          Our goal is to provide our customers with professional  services. 
          We pride ourselves on our reliable and friendly service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <img src={work1} alt="Work 1" className="max-w-full h-auto" />
            <span className="mt-4 text-lg lg:text-xl font-serif font-normal text-blue-800">
              Inspect & Analyze
            </span>
          </div>

          <div className="flex flex-col items-center">
            <img src={work2} alt="Work 2" className="max-w-full h-auto" />
            <span className="mt-4 text-lg lg:text-xl font-serif font-normal text-blue-800">
              Design & Plan
            </span>
          </div>

          <div className="flex flex-col items-center">
            <img src={work3} alt="Work 3" className="max-w-full h-auto" />
            <span className="mt-4 text-lg lg:text-xl font-serif font-normal text-blue-800">
              Implement & Deliver
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section;
