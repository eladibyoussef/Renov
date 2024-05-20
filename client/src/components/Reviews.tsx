import React from 'react';

const Reviews = ({ ReviewsRef }: { ReviewsRef: React.RefObject<HTMLDivElement> }) => {
    return (
        <div ref={ReviewsRef} className='h-screen'>
            <h1>Reviews</h1>


            
        </div>
    );
}

export default Reviews;
