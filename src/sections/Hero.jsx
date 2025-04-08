import { Element, Link as LinkScroll } from "react-scroll";
import Button from "../components/Button.jsx";
import Carousel from '../sections/Carousel.jsx';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [dimensions, setDimensions] = useState({
    width: 800,
    height: 400
  });

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      
      // Responsive width calculations
      const width = Math.min(
        viewportWidth < 640 ? viewportWidth - 64 : // Increased padding for small mobile
        viewportWidth < 768 ? viewportWidth - 80 : // Increased padding for mobile
        viewportWidth < 1024 ? Math.min(viewportWidth * 0.75, 680) : // Reduced width % for tablet
        Math.min(viewportWidth * 0.45, 780), // Reduced width % for desktop
        780 // Slightly reduced max width
      );

      // Maintain video aspect ratio (348/460)
      const height = Math.round(width * (348/460));

      setDimensions({ width, height });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update the carousel container styles
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 md:pt-32 md:pb-20">
      <Element name="hero">
        <div className="container relative z-10 px-6 sm:px-8 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative z-2 max-lg:text-center max-lg:flex max-lg:flex-col max-lg:items-center">
              <div className="mb-4">
                {/* <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30">
                  <span className="caption small-2 uppercase text-blue-400">Video Editing</span>
                </div> */}
              </div>
              
              <h1 className="mb-6 h2 text-p4  max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12">
                <span className="text-white">WHERE INNOVATION MEETS </span> <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00A3FF] to-[#0057FF]">INTELLIGENCE</span>
              </h1>
              
              <p className="max-w-440 mb-10 body-1 text-gray-300 max-lg:mx-auto">
              Join the Middle East Banking AI & Analytics Summit, where visionary leaders come together to shape the future of banking. 
              </p>
              
              <div className="flex flex-wrap gap-4 max-lg:justify-center">
              
                
                
              </div>
              
             
            </div>
            
            <div className="relative grid-cols-1 lg:grid-cols-2 gap-10 items-center max-lg:flex max-lg:justify-center">
              <div className="w-full justify-center sm:px-6 md:px-8 lg:px-4">
                <Carousel
                  baseWidth={dimensions.width}
                  baseHeight={dimensions.height}
                  autoplay={true}
                  autoplayDelay={9000}
                  pauseOnHover={true}
                  loop={true}
                  round={false}
                />
              </div>
            </div>
          </div>
        </div>
      </Element>
      
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <video 
          src="/images/herobg.webm" 
          className="w-full h-full object-cover opacity-50"
          autoPlay
          muted
          loop
        ></video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>
      </div>
    </section>
  );
};

export default Hero;
