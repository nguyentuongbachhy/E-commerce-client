import { useEffect, useRef, useState } from 'react';

// Import images at the top level
import banner_1 from '../utils/images/banners/banner_1.webp';
import banner_2 from '../utils/images/banners/banner_2.webp';
import banner_3 from '../utils/images/banners/banner_3.webp';
import banner_4 from '../utils/images/banners/banner_4.webp';
import banner_5 from '../utils/images/banners/banner_5.webp';
import banner_6 from '../utils/images/banners/banner_6.webp';

function Banner() {
    // Use the imported images directly
    const banners = [
        { id: 1, src: banner_1, alt: 'banner_1' },
        { id: 2, src: banner_2, alt: 'banner_2' },
        { id: 3, src: banner_3, alt: 'banner_3' },
        { id: 4, src: banner_4, alt: 'banner_4' },
        { id: 5, src: banner_5, alt: 'banner_5' },
        { id: 6, src: banner_6, alt: 'banner_6' }
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [visibleBanners, setVisibleBanners] = useState(2);
    const [bannerHeight, setBannerHeight] = useState('h-32');
    const sliderRef = useRef(null);
    const containerRef = useRef(null);

    // Update based on screen size
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            // Set number of visible banners based on screen width
            if (width < 640) {
                setVisibleBanners(1);
                setBannerHeight('h-32 sm:h-40');
            } else if (width < 768) {
                setVisibleBanners(2);
                setBannerHeight('h-40 md:h-48');
            } else if (width < 1024) {
                setVisibleBanners(2);
                setBannerHeight('h-48 lg:h-56');
            } else {
                setVisibleBanners(2);
                setBannerHeight('h-56 lg:h-80');
            }
        };

        // Set initial values
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Clean up
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Function to move to the next slide
    const slideToNext = () => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        const nextIndex = (activeIndex + visibleBanners) % banners.length;
        setActiveIndex(nextIndex);

        // Remove transition class after animation completes
        setTimeout(() => {
            setIsTransitioning(false);
        }, 500);
    };

    // Function to move to the previous slide
    const slideToPrev = () => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        const prevIndex = (activeIndex - visibleBanners + banners.length) % banners.length;
        setActiveIndex(prevIndex);

        // Remove transition class after animation completes
        setTimeout(() => {
            setIsTransitioning(false);
        }, 500);
    };

    // Set up automatic sliding
    useEffect(() => {
        const interval = setInterval(() => {
            slideToNext();
        }, 4000);

        return () => clearInterval(interval);
    }, [activeIndex, isTransitioning, visibleBanners]);

    // Calculate how many dots we need based on visibleBanners
    const totalDots = Math.ceil(banners.length / visibleBanners);

    // Calculate current dot index
    const currentDotIndex = Math.floor(activeIndex / visibleBanners);

    return (
        <div className="w-full overflow-hidden" ref={containerRef}>
            <div className={`${bannerHeight} relative`}>
                {/* Navigation buttons */}
                <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-1 rounded-full"
                    onClick={slideToPrev}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-1 rounded-full"
                    onClick={slideToNext}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Main slider container */}
                <div
                    ref={sliderRef}
                    className={`flex absolute w-full h-full ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                    style={{
                        transform: `translateX(-${(activeIndex * 100) / visibleBanners}%)`,
                    }}
                >
                    {/* All banners in a row */}
                    {banners.map((banner) => (
                        <div
                            key={banner.id}
                            className={`flex-shrink-0 px-1`}
                            style={{ width: `${100 / visibleBanners}%` }}
                        >
                            <img
                                src={banner.src}
                                alt={banner.alt}
                                className={`${bannerHeight} w-full object-cover rounded-md cursor-pointer hover:opacity-95 transition-opacity`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center mt-2">
                {Array(totalDots).fill(0).map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 
                            ${currentDotIndex === index ? 'bg-blue-500 w-3' : 'bg-gray-300 hover:bg-gray-400'}`}
                        onClick={() => {
                            setIsTransitioning(true);
                            setActiveIndex(index * visibleBanners);
                            setTimeout(() => setIsTransitioning(false), 500);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default Banner;