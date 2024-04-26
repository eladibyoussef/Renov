import React from 'react';
import Hero from '../components/Hero/hero';
import Services from '../components/servicess/services';
import About from '../components/About/About';
import Section from '../components/section/section';
import Testimonial from '../components/testimonial/testimonial';

function LandingPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-screen-xl mx-auto">
        <Hero />
        <Services />
        <About />
        <Section />
        <Testimonial />
      </div>
    </div>
  );
}

export default LandingPage;
