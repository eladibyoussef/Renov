import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/hero';
import Services from '../components/servicess/services';
import About from '../components/About/About';
import Section from '../components/section/section';
import Footer from '../components/footer/footer';
import Testimonial from '../components/testimonial/testimonial';

function LandingPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-screen-xl mx-auto">
        <Navbar />
        <Hero />
        <Services />
        <About />
        <Section />
        <Testimonial />
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;
