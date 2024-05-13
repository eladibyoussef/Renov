import React from 'react';

const HowItWorks = ({ howItWorksRef }: { howItWorksRef: React.RefObject<HTMLDivElement> }) => {
    return (
        <div ref={howItWorksRef} className="relative z-10">
<div className="flex items-center justify-center my-4">
    <div className="border-t border-black flex-grow"></div>
    <p className="mx-4 text-gray-700">How it Works</p>
    <div className="border-t border-black flex-grow"></div>
</div>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 sm:gap-0 ">
                <div className="relative order-1 sm:-mr-10 z-10 pt-5" >
                
                    {/* Container for the chart */}
                    <div className=" w-full h-96   bg-white rounded-lg border border-black sm:overflow-auto  "> 
                    <h1 className='ml-5 mr-5 mt-4 mb-2 font-pacifico bg-sky-100 hover:underline hover:text-gray-800 hover:bg-gray-200'>1-Request a repair</h1>
                    <p className='ml-2 mb-10 font-Outfit'>Let us know you need plumbing repair services by calling  or filling out <button className='underline'>the form</button> above.</p>
                    <h1 className='ml-5 mr-5 mt-2 mb-2 text-black font-pacifico bg-sky-100 hover:underline hover:text-gray-800 hover:bg-gray-200'>2-Get pro rocommendation</h1>
                    <p className='ml-2 mb-10 font-Outfit'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae dolores aut iusto ipsum laborum iure. Ullam quae error animi iste sunt velit voluptatem non delectus necessitatibus consequatur. Harum, rem nulla.</p>

                    <h1 className="ml-5 mr-5 mt-2 mb-2 font-pacifico bg-sky-100 hover:underline hover:text-gray-800 hover:bg-gray-200">3-Enjoy peace of mind</h1>
                    <p className='ml-2 mb-10 font-Outfit'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae dolores aut iusto ipsum laborum iure. Ullam quae error animi iste sunt velit voluptatem non delectus necessitatibus consequatur. Harum, rem nulla.</p>
    
                    </div>
                                              
                </div>
                <div className="relative order-2">
                    {/* Container for the image */}
                    <img src="https://goodbeeplumbinganddrains.com/wp-content/uploads/2023/01/iStock-1341381755-1024x683.jpg" alt="How it works" className="w-full h-auto" />
                </div>
            </div>
        </div>
    );
}

export default HowItWorks;
