import React from 'react';
import Hero from '../components/Hero/hero';
import Services from '../components/servicess/services';
import About from '../components/About/About';
import Section from '../components/section/section';
import Testimonial from '../components/testimonial/testimonial';
import Shop from '../components/Shopp/shop'
import Team from '../components/Team/team'
import Sub from '../components/Subscribe/sub'

function LandingPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-screen-xl mx-auto">
        <Hero />
        <Services />
        <Team /> 
        <Shop /> 
        <Sub />
        <About />
        <Testimonial />
        <Section />
      </div>
    </div>
  );
}

export default LandingPage;
