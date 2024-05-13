import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faCog, faTools, faQuestionCircle, faInfoCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import { Refs } from '../pages/RequestPage';



const Navigation: React.FC<{ 
    scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void,
    references: Refs 
}> = ({ scrollToSection, references }) => {



    return (
        <>
        <nav className="w-full h-12 bg-gray-50 mix-blend-overlay hidden sm:block">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-full">
                    <div className="hidden sm:flex space-x-6 lg:space-x-24"> 
                        <button
                            // onClick={() => scrollToSection(CheckAvailability)}
                            className="font-serif font-medium group hover:text-gray-700 flex flex-col items-center justify-center relative">
                            Check availability
                            <div className="absolute w-3/4 h-1 bg-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-0 left-1/2 transform -translate-x-1/2" />
                        </button>
                        <button
                            onClick={() => scrollToSection(references.howItWorksRef)}
                            className="font-serif font-medium group hover:text-gray-800 flex flex-col items-center justify-center relative ">
                            How it Works
                            <div className="absolute w-3/4 h-1 bg-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-0 left-1/2 transform -translate-x-1/2" />
                        </button>
                        <button
                            onClick={() => scrollToSection(references.servicesRef)}
                            className="font-serif font-medium group hover:text-gray-800 flex flex-col items-center justify-center relative">
                            Plumbing Services We Provide
                            <div className="absolute w-3/4 h-1 bg-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-0 left-1/2 transform -translate-x-1/2" />
                        </button>
                        <button
                            onClick={() => scrollToSection(references.faqRef)}
                            className="font-serif font-medium group hover:text-gray-800 flex flex-col items-center justify-center relative">
                            FAQs
                            <div className="absolute w-3/4 h-1 bg-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-0 left-1/2 transform -translate-x-1/2" />
                        </button>
                        <button
                            onClick={() => scrollToSection(references.LearnMoreRef)}
                            className="font-serif font-medium group hover:text-gray-800 flex flex-col items-center justify-center relative ">
                            Learn More
                            <div className="absolute w-3/4 h-1 bg-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-0 left-1/2 transform -translate-x-1/2" />
                        </button>
                        <button
                            onClick={() => scrollToSection(references.ReviewsRef)}
                            className="font-serif font-medium group hover:text-gray-800 flex flex-col items-center justify-center relative">
                            Reviews
                            <div className="absolute w-3/4 h-1 bg-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-0 left-1/2 transform -translate-x-1/2" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>


 {/* nav for sm(mobile) */}
 <nav className="sm:hidden text-3xl bg-[#afb5b9]">
    <div className="flex flex-wrap justify-center absolute z-10">
        <button
            // onClick={() => scrollToSection(CheckAvailability)}
            className="w-full sm:w-auto flex-grow sm:flex-none flex items-center justify-center group hover:text-gray-700 relative px-4 py-2 sm:mx-1 my-1">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <div className="w-full h-1.5 bg-blue-900 opacity-0 -opacity duration-300" />
        </button>
        <button
            onClick={() => scrollToSection(references.howItWorksRef)}
            className="w-full sm:w-auto flex-grow sm:flex-none flex items-center justify-center group hover:text-gray-800 relative px-4 py-2 sm:mx-1 my-1">
            <FontAwesomeIcon icon={faCog} />
            <div className="w-full h-1.5 bg-blue-900 opacity-0 -opacity duration-300" />
        </button>
        <button
            onClick={() => scrollToSection(references.servicesRef)}
            className="w-full sm:w-auto flex-grow sm:flex-none flex items-center justify-center group hover:text-gray-800 relative px-4 py-2 sm:mx-1 my-1">
            <FontAwesomeIcon icon={faTools} />
            <div className="w-full h-1.5 bg-blue-900 opacity-0 -opacity duration-300" />
        </button>
        <button
            onClick={() => scrollToSection(references.faqRef)}
            className="w-full sm:w-auto flex-grow sm:flex-none flex items-center justify-center group hover:text-gray-800 relative px-4 py-2 sm:mx-1 my-1">
            <FontAwesomeIcon icon={faQuestionCircle} />
            <div className="w-full h-1.5 bg-blue-900 opacity-0 -opacity duration-300" />
        </button>
        <button
            onClick={() => scrollToSection(references.LearnMoreRef)}
            className="w-full sm:w-auto flex-grow sm:flex-none flex items-center justify-center group hover:text-gray-800 relative px-4 py-2 sm:mx-1 my-1">
            <FontAwesomeIcon icon={faInfoCircle} />
            <div className="w-full h-1.5 bg-blue-900 opacity-0 -opacity duration-300" />
        </button>
        <button
            onClick={() => scrollToSection(references.ReviewsRef)}
            className="w-full sm:w-auto flex-grow sm:flex-none flex items-center justify-center group hover:text-gray-800 relative px-4 py-2 sm:mx-1 my-1">
            <FontAwesomeIcon icon={faStar} />
            <div className="w-full h-1.5 bg-blue-900 opacity-0 -opacity duration-300"/>
        </button>
    </div>
</nav>




    
      </>
    );
}

export default Navigation;
