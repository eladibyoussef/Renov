import React, { RefObject, useRef } from 'react';
import Navigation from '../components/Nav';
import RequestForm from '../components/RequestForm';
import HowItWorks from '../components/HowItWorks';
import ProvidedServices from '../components/ProvidedServices';
import Faq from '../components/FAQ';


export interface Refs {
    howItWorksRef: RefObject<HTMLDivElement>;
    servicesRef: RefObject<HTMLDivElement>;
    faqRef:RefObject<HTMLDivElement>;


}

const RequestPage = () => {
    const refs: Refs = {
        howItWorksRef: useRef<HTMLDivElement>(null),
        servicesRef: useRef<HTMLDivElement>(null),
        faqRef :useRef<HTMLDivElement>(null),


    };

    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='relative'>
            <Navigation 
                scrollToSection={scrollToSection} 
                references={refs} 
                 
            />
            <RequestForm/>
            <HowItWorks howItWorksRef={refs.howItWorksRef} />
            <ProvidedServices ProvidedServicesRef={refs.servicesRef}/>
            <Faq FaqRef={refs.faqRef}/>


            
        </div>
    );
}

export default RequestPage;