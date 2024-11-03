// src/components/Hero.tsx
import React from 'react';

const Hero = () => (
  <section
    className="relative h-screen bg-cover bg-center flex flex-col justify-center items-center"
    style={{
      backgroundImage: "url('/images/hero-image.jpg')", // Path to your image
    }}
  >
    {/* Blur Effect Overlay */}
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

    {/* Text Content */}
    <div className="relative z-10 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
        به خدمات حمل و نقل ما خوش آمدید
      </h1>
      <p className="text-xl md:text-2xl text-gray-200">
        راهکارهای حمل و نقل مطمئن و کارآمد گاز ال‌پی‌جی
      </p>
    </div>
  </section>
);

export default Hero;
