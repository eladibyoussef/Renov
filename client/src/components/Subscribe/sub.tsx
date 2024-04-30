import React from 'react';
import video from '../../Assets/video.mp4'; 

const subVideo = {
    height: '10%',
    width: '100%',
    position: 'relative', 
};

const Subscribe = () => {
    return (
        <div className='mb-20 bg-gray-800 mt-24' data-aos="zoom-in" style={subVideo}>
            <video
                autoPlay
                loop
                muted
                style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
            >
                <source src={video} type='video/mp4' />
                {/* Ajoutez d'autres sources pour les différents types de vidéo si nécessaire */}
                Your browser does not support the video tag.
            </video>
            <div className='container mx-auto py-10 backdrop-filter backdrop-blur-sm'>
                <div className='max-w-xl mx-auto space-y-6 text-center'>
                    <h1 className='text-3xl sm:text-5xl font-semibold'>
                        Get Notified About New Products
                    </h1>
                    <input
                        data-aos="fade-up"
                        type='text'
                        placeholder='Enter your email'
                        className='w-full px-4 py-3 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
            </div>
        </div>
    );
};

export default Subscribe;
