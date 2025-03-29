import React from 'react';
import Hero from './(everyone)/promopage/hero';
import Features from './(everyone)/promopage/features';
import FeaturesBlocks from './(everyone)/promopage/features-blocks';
import Testimonials from './(everyone)/promopage/testimonials';
import Newsletter from './(everyone)/promopage/newsletter';

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
