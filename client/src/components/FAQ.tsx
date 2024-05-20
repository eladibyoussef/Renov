import React from 'react';

const Faq = ({ FaqRef }: { FaqRef: React.RefObject<HTMLDivElement> }) => {
    return (
        <div ref={FaqRef} className='h-screen'>
            <h1>FAQ</h1>
        </div>
    );
}

export default Faq;
