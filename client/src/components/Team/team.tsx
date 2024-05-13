import React from 'react';
import team from '../../Assets/vgj.png';

function Team() {
  return (
    <div className="bg-[#4B86B1] py-12">
      <div className="container max-w-screen-md mx-auto px-6 lg:max-w-screen-lg lg:flex lg:items-center lg:justify-center lg:gap-12">
        <div className="lg:w-1/3 lg:rounded-lg lg:overflow-hidden">
          <img src={team} alt="Team" className="w-full h-96 lg:hover:scale-105 transition-transform" />
        </div>
        <div className="lg:w-1/3 lg:text-left">
          <h2 className="text-white font-bold text-3xl lg:text-5xl pt-4 lg:pt-0">Become a RENOVO Pro</h2>
          <p className="py-4 text-white text-sm md:text-base">
            Are you passionate about innovation and teamwork? We are looking for talented individuals to join our
            dynamic team at RONOVO. If you thrive in a collaborative environment and are eager to tackle exciting
            challenges, we want to hear from you!
          </p>
          <button className="block w-full lg:w-auto px-6 py-3 mx-auto lg:mx-0 text-white font-bold rounded-lg border-2 border-gray-400 bg-transparent hover:bg-black hover:text-white transition-colors text-sm md:text-base">
            Apply Now
          </button>
          <div className="flex items-center justify-center lg:justify-start mt-4 lg:mt-0">
            {[...Array(3)].map((_, index) => (
              <img key={index} src={team} alt={`Team member ${index + 1}`} className="w-6 h-6 md:w-7 md:h-7 rounded-full -mr-2 md:-mr-3 border border-white" />
            ))}
            <p className="text-white ml-2 md:ml-4 text-sm md:text-base p-5">Our Team</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
