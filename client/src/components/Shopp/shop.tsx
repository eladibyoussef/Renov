import React from 'react';
import shop1 from '../../Assets/1.png';
import shop2 from '../../Assets/2.png';
import shop3 from '../../Assets/3.png';
import shop9 from '../../Assets/9.png';
import shop10 from '../../Assets/10.png';
import shop7 from '../../Assets/7.png';
import shop8 from '../../Assets/8.png';


function Shop() {
  const Card = ({ image, name, item, amount }) => {
    return (
      <div className='max-w-xs mx-auto mb-6 rounded-lg overflow-hidden shadow-lg bg-white'>
        <div className='relative'>
          <img src={image} alt={name} className='w-full h-auto object-cover hover:opacity-75 transition-opacity duration-300' />
          <div className='absolute inset-0 bg-gray-900 opacity-0 hover:opacity-50 transition-opacity duration-300'></div>
        </div>
        <div className='p-4'>
          <button className='text-lg font-bold text-gray-800'>{name}</button>
          <p className='text-sm text-gray-600 mt-2'>{item}</p>
          <p className='text-lg font-bold text-red-500 mt-2'>{amount}.00Dhs</p>
        </div>
      </div>
    );
  };

  const shopData = [
    { image: shop1, name: 'Shop 1', item: 'Item 1', amount: 100 },
    { image: shop2, name: 'Shop 2', item: 'Item 2', amount: 150 },
    { image: shop3, name: 'Shop 3', item: 'Item 3', amount: 120 },
    { image: shop7, name: 'Shop 4', item: 'Item 4', amount: 200 },
    { image: shop8, name: 'Shop 5', item: 'Item 5', amount: 220 },
    { image: shop9, name: 'Shop 6', item: 'Item 6', amount: 180 },
    { image: shop10, name: 'Shop 7', item: 'Item 7', amount: 250 },
  ];

  return (
    <div className='container mx-auto px-6 ' data-aos='fade-up'>
      <div className='lg:flex justify-between py-8'>
        <h2 className='font-black text-4xl py-4'>SHOP</h2>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 '>
        {shopData.map((shop, index) => (
          <Card 
            key={index}
            image={shop.image}
            name={shop.name}
            item={shop.item}
            amount={shop.amount}
           />
        ))}
      </div>
    </div>
  );
}

export default Shop;
