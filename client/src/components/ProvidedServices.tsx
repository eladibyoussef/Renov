import React from 'react';

const ProvidedServices = ({ ProvidedServicesRef }: { ProvidedServicesRef: React.RefObject<HTMLDivElement> }) => {
    return (
        <div ref={ProvidedServicesRef} className='h-screen'>
<div className="flex items-center justify-center my-10">
    <div className="border-t border-black flex-grow"></div>
    <h1 className="mx-4 text-gray-700">Plumbing services we provide</h1>
    <div className="border-t border-black flex-grow"></div>
</div>

<div className="flex items-center justify-between mx-40 min-h-80 bg-blue-100 p-4 rounded-lg shadow-md">
    <div> 
        <h2 className="text-lg font-semibold text-gray-800 mb-5 hover:underline">Subcategory Name</h2>
        <p className="text-sm text-gray-600 ">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, at iure labore molestias, quod, dignissimos saepe repellat doloremque laboriosam dolores quis numquam. Saepe, illo quidem recusandae placeat ad aliquid voluptates.. Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo veniam nobis quisquam pariatur aperiam, distinctio facilis, vitae quia laboriosam tenetur nesciunt vel! Expedita animi cumque pariatur ipsa ex architecto unde?</p>
    </div>
    <img src="https://www.servicemasterrestore.com/images/blog/qtq80-U52J2D.jpeg" alt="Subcategory" className="w-1/3" />
</div>

        </div>
    );
}

export default ProvidedServices;
