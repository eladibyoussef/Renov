import { FaBriefcase, FaShoppingCart } from 'react-icons/fa'; 

export default function Pro5() {
  return (
    <section className="py-12 md:py-24 lg:py-32 text-center bg-gray-100">
      <div className="container mx-auto px-4 md:px-6 grid gap-8 md:gap-10 items-center justify-center">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-800">
            Explore Our Services
          </h2>
          <p className="text-gray-600 md:text-xl lg:text-base ">
            Choose from our available services below.
          </p>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-8 justify-center">
          <button className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-300">
            <FaBriefcase className="w-5 h-5 mr-2" /> Professional Services
          </button>
          
          <button className="flex items-center justify-center px-6 py-3 bg-white text-black rounded-lg shadow-md border border-gray-300 transition duration-300">
            <FaShoppingCart className="w-5 h-5 mr-2" /> Shop Now
          </button>
        </div>
      </div>
    </section>
  );
}
