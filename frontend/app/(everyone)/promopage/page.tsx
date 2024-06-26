import React from 'react';
import Hero from './hero';
import Features from './features';
import FeaturesBlocks from './features-blocks';
import Testimonials from './testimonials';
import Newsletter from './newsletter';

export default function page() {
  return (
    <div className="overflow-x-hidden h-full">
      <Hero />
      <Features />
      <FeaturesBlocks />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
