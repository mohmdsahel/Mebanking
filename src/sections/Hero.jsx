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
      setDimensions({
        width: window.innerWidth < 768 ? 350 : window.innerWidth < 1024 ? 600 : 800,
        height: window.innerWidth < 768 ? 400 : window.innerWidth < 1024 ? 350 : 400
      });
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20">
      <Element name="hero">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative z-2 max-lg:text-center max-lg:flex max-lg:flex-col max-lg:items-center">
              <div className="mb-4">
                {/* <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30">
                  <span className="caption small-2 uppercase text-blue-400">Video Editing</span>
                </div> */}
              </div>
              
              <h1 className="mb-6 h1 text-p4 uppercase max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12">
                <span className="text-white">Innovating</span> <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00A3FF] to-[#0057FF]">Finance</span>
              </h1>
              
              <p className="max-w-440 mb-10 body-1 text-gray-300 max-lg:mx-auto">
              Join the Middle East Banking AI & Analytics Summit, where visionary leaders come together to shape the future of banking. 
              </p>
              
              <div className="flex flex-wrap gap-4 max-lg:justify-center">
                <LinkScroll to="features" offset={-100} spy smooth>
                  <Button icon="/images/magictouch.svg" >Explore now</Button>
                </LinkScroll>
                
                
              </div>
              
             
            </div>
            
            <div className="relative grid-cols-1 lg:grid-cols-2 gap-10 items-center max-lg:flex max-lg:justify-center">
              <div className="w-full justify-center md:px-8 lg:px-0">
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
