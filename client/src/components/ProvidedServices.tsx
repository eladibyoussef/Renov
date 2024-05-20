import React, { useState } from 'react';

const ProvidedServices = ({ ProvidedServicesRef }: { ProvidedServicesRef: React.RefObject<HTMLDivElement> }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('kitchen');
    const categories = ['kitchen', 'bathroom', 'livingRoom', 'bedroom', 'outdoor'];

    // Define subcategory information for each category
    const subcategories: { [key: string]: { name: string; description: string } } = {
        kitchen: {
            name: 'Kitchen Services',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget ipsum et ex lacinia interdum. Nullam accumsan suscipit ex, nec pretium dui hendrerit in. Donec hendrerit vehicula enim, vitae lacinia neque ultricies eget.'
        },
        bathroom: {
            name: 'Bathroom Services',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget ipsum et ex lacinia interdum. Nullam accumsan suscipit ex, nec pretium dui hendrerit in. Donec hendrerit vehicula enim, vitae lacinia neque ultricies eget.'
        },
        livingRoom: {
            name: 'Living Room Services',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget ipsum et ex lacinia interdum. Nullam accumsan suscipit ex, nec pretium dui hendrerit in. Donec hendrerit vehicula enim, vitae lacinia neque ultricies eget.'
        },
        bedroom: {
            name: 'Bedroom Services',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget ipsum et ex lacinia interdum. Nullam accumsan suscipit ex, nec pretium dui hendrerit in. Donec hendrerit vehicula enim, vitae lacinia neque ultricies eget.'
        },
        outdoor: {
            name: 'Outdoor Services',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget ipsum et ex lacinia interdum. Nullam accumsan suscipit ex, nec pretium dui hendrerit in. Donec hendrerit vehicula enim, vitae lacinia neque ultricies eget.'
        },
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    const handleNextCategory = () => {
        const currentIndex = categories.indexOf(selectedCategory);
        const nextIndex = (currentIndex + 1) % categories.length;
        setSelectedCategory(categories[nextIndex]);
    };

    const handlePreviousCategory = () => {
        const currentIndex = categories.indexOf(selectedCategory);
        const previousIndex = (currentIndex - 1 + categories.length) % categories.length;
        setSelectedCategory(categories[previousIndex]);
    };

    return (
        <div ref={ProvidedServicesRef} className='h-full'>
            <div className="flex items-center justify-center my-10">
                <div className="border-t border-black flex-grow"></div>
                <h1 className="mx-4 text-gray-700">Plumbing services we provide</h1>
                <div className="border-t border-black flex-grow"></div>
            </div>

            {/* Category Navigation */}
            <div className="flex flex-wrap justify-center mb-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        type="button"
                        className={`mx-2 my-2 py-2 px-4 rounded-lg ${
                            selectedCategory === category ? 'bg-blue-900 text-white' : 'bg-gray-300 text-gray-700 '
                        }`}
                        onClick={() => handleCategoryChange(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Category Content */}
            <div className="flex items-center justify-between mx-4 sm:mx-12 md:mx-24 lg:mx-40 min-h-80 bg-blue-100 p-4 rounded-lg shadow-md">
                <button
                    type="button"
                    className="py-2 px-4 rounded-lg bg-gray-300 text-gray-700"
                    onClick={handlePreviousCategory}
                >
                    &lt;
                </button>
                <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800 mb-5 hover:underline">{subcategories[selectedCategory].name}</h2>
                    <p className="text-sm text-gray-600 ">
                        {subcategories[selectedCategory].description}
                    </p>
                </div>
                <button
                    type="button"
                    className=" py-2 px-4 rounded-lg bg-gray-300 text-gray-700"
                    onClick={handleNextCategory}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default ProvidedServices;
