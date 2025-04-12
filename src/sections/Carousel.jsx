import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const DEFAULT_ITEMS = [
  {
    id: 0,
    url: "https://mebankingai.com/sa/",
    video: "/images/KSA.webm"
  },
  {
    id: 1,
    url: "https://mebankingai.com/ae/",
    video: "/images/UAE.webm"
  },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseHeight = 300,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}) {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const containerRef = useRef(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) {
            return prev + 1; // Animate to clone.
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
      dragConstraints: {
        left: -trackItemOffset * (carouselItems.length - 1),
        right: 0,
      },
    };

  return (
    <div className="relative flex flex-col gap-8">
      <div
        ref={containerRef}
        className={`relative overflow-hidden p-4 pb-16 ${round
          ? "rounded-full border border-white"
          : "rounded-[24px] border border-[#222]"
          }`}
        style={{
          width: `${baseWidth}px`,
          height: round ? `${baseWidth}px` : `${baseHeight + 48}px`, // Increased height
        }}
      >
        <motion.div
          className="flex"
          drag="x"
          {...dragProps}
          style={{
            width: itemWidth,
            gap: `${GAP}px`,
            perspective: 1000,
            perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
            x,
          }}
          onDragEnd={handleDragEnd}
          animate={{ x: -(currentIndex * trackItemOffset) }}
          transition={effectiveTransition}
          onAnimationComplete={handleAnimationComplete}
        >
          {carouselItems.map((item, index) => {
            const range = [
              -(index + 1) * trackItemOffset,
              -index * trackItemOffset,
              -(index - 1) * trackItemOffset,
            ];
            const outputRange = [90, 0, -90];
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const rotateY = useTransform(x, range, outputRange, { clamp: false });
            return (
              <motion.div
                key={index}
                className={`relative shrink-0 flex flex-col ${round
                  ? "items-center justify-center text-center bg-[#060606] border-0"
                  : "items-start justify-between bg-[#000] rounded-[24px] overflow-hidden"
                  }`}
                style={{
                  width: itemWidth,
                  height: round ? itemWidth : baseHeight - containerPadding * 2,
                  rotateY: rotateY,
                  ...(round && { borderRadius: "50%" }),
                }}
                transition={effectiveTransition}
              >
                <div className="absolute inset-0 w-full h-full">
                  <video
                    src={item.video}
                    alt=""
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="relative z-10 w-full h-full flex flex-col justify-end items-center pb-4 sm:pb-8">
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`w-auto min-w-[100px] max-w-[180px] text-center inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 md:px-8 py-1.5 sm:py-3 text-sm sm:text-base md:text-lg font-medium text-white bg-gradient-to-r from-[#00A3FF] to-[#0057FF] rounded-full hover:opacity-90 transition-opacity mt-auto sm:mt-0 ${
                      item.video.includes('UAE') ? 'self-end mr-8' : ''
                    }`}
                  >
                    <span className="whitespace-nowrap">Explore</span>
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        <div className="flex items-center justify-center gap-4 absolute bottom-4 left-0 right-0">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
            className="p-2.5 rounded-full bg-gradient-to-r from-[#00A3FF]/10 to-[#0057FF]/10 border border-[#00A3FF]/20 hover:border-[#00A3FF]/40 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

         

          <button
            onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, items.length - 1))}
            className="p-2.5 rounded-full bg-gradient-to-r from-[#00A3FF]/10 to-[#0057FF]/10 border border-[#00A3FF]/20 hover:border-[#00A3FF]/40 transition-colors"
            >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
