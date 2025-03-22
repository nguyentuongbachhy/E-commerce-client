import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import beautifulHealth from '../utils/images/features/BeautyHealth.png'
import bestSellings from '../utils/images/features/Bestsellings.png'
import coupon from '../utils/images/features/Coupon.png'
import sale from '../utils/images/features/Sale.png'
import salesAgents from '../utils/images/features/SalesAgents.png'
import topDeal from '../utils/images/features/TopDeal.png'
import traveling from '../utils/images/features/Traveling.png'
import valentineGifts from '../utils/images/features/ValentineGifts.png'
import vitaminForBaby from '../utils/images/features/VitaminForBaby.png'


interface ITopDealProps {
    img_url: string,
    title: string,
    link_url: string,
    color: string
}

const topDeals: ITopDealProps[] = [
    { img_url: topDeal, title: 'Top Deals', link_url: '/top-deals', color: 'red' },
    { img_url: salesAgents, title: 'Sales Agents', link_url: '/sales-agents', color: 'amber' },
    { img_url: coupon, title: 'Coupons', link_url: '/coupons', color: 'blue' },
    { img_url: sale, title: 'Sales', link_url: '/sales', color: 'yellow' },
    { img_url: beautifulHealth, title: 'Beauty & Health', link_url: '/beauty-health', color: 'green' },
    { img_url: bestSellings, title: 'Best Sellings', link_url: '/best-sellings', color: 'indigo' },
    { img_url: valentineGifts, title: 'Valentine Gifts', link_url: '/valentine-gifts', color: 'red' },
    { img_url: traveling, title: 'Traveling', link_url: '/traveling', color: 'blue' },
    { img_url: vitaminForBaby, title: 'Vitamin For Baby', link_url: '/vitamin-for-baby', color: 'yellow' },
]

function TopDeal() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [visibleItems, setVisibleItems] = useState(6);
    const [itemWidth, setItemWidth] = useState("16.666%");
    const [scrollProgress, setScrollProgress] = useState(0);
    const [contentWidth, setContentWidth] = useState(0);
    const [viewportWidth, setViewportWidth] = useState(0);

    // Adjust number of visible items based on screen width
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setVisibleItems(4);
                setItemWidth("25%");
            } else if (width < 768) {
                setVisibleItems(5);
                setItemWidth("20%");
            } else {
                setVisibleItems(6);
                setItemWidth("16.666%");
            }

            // Update viewport and content width
            if (scrollRef.current) {
                setViewportWidth(scrollRef.current.clientWidth);
                setContentWidth(scrollRef.current.scrollWidth);
            }
        };

        // Set initial value
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Clean up
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Add touch scrolling for mobile
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let isDown = false;
        let startX: number;
        let scrollLeft: number;

        const handleMouseDown = (e: MouseEvent | TouchEvent) => {
            isDown = true;
            scrollContainer.classList.add('cursor-grabbing');
            startX = 'touches' in e ? e.touches[0].pageX : e.pageX;
            scrollLeft = scrollContainer.scrollLeft;
        };

        const handleMouseLeave = () => {
            isDown = false;
            scrollContainer.classList.remove('cursor-grabbing');
        };

        const handleMouseUp = () => {
            isDown = false;
            scrollContainer.classList.remove('cursor-grabbing');
        };

        const handleMouseMove = (e: MouseEvent | TouchEvent) => {
            if (!isDown) return;
            e.preventDefault();
            const x = 'touches' in e ? e.touches[0].pageX : e.pageX;
            const walk = (x - startX) * 2; // Scroll speed multiplier
            scrollContainer.scrollLeft = scrollLeft - walk;
        };

        // Update scroll progress
        const handleScroll = () => {
            const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            const currentProgress = (scrollContainer.scrollLeft / maxScrollLeft) * 100;
            setScrollProgress(currentProgress);
        };

        scrollContainer.addEventListener('mousedown', handleMouseDown as EventListener);
        scrollContainer.addEventListener('mouseleave', handleMouseLeave);
        scrollContainer.addEventListener('mouseup', handleMouseUp);
        scrollContainer.addEventListener('mousemove', handleMouseMove as EventListener);
        scrollContainer.addEventListener('scroll', handleScroll);

        // Touch events
        scrollContainer.addEventListener('touchstart', handleMouseDown as EventListener);
        scrollContainer.addEventListener('touchend', handleMouseUp);
        scrollContainer.addEventListener('touchmove', handleMouseMove as EventListener);

        // Initial calculation
        setViewportWidth(scrollContainer.clientWidth);
        setContentWidth(scrollContainer.scrollWidth);

        return () => {
            scrollContainer.removeEventListener('mousedown', handleMouseDown as EventListener);
            scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
            scrollContainer.removeEventListener('mouseup', handleMouseUp);
            scrollContainer.removeEventListener('mousemove', handleMouseMove as EventListener);
            scrollContainer.removeEventListener('scroll', handleScroll);

            scrollContainer.removeEventListener('touchstart', handleMouseDown as EventListener);
            scrollContainer.removeEventListener('touchend', handleMouseUp);
            scrollContainer.removeEventListener('touchmove', handleMouseMove as EventListener);
        };
    }, []);

    // Calculate if scroll is needed (content wider than viewport)
    const needsScroll = contentWidth > viewportWidth;

    return (
        <div className="w-full overflow-hidden my-2">
            <div className="w-full">
                <div className="overflow-x-auto cursor-grab"
                    ref={scrollRef}
                    style={{
                        msOverflowStyle: 'none', // IE and Edge
                        scrollbarWidth: 'none',  // Firefox
                        WebkitOverflowScrolling: 'touch' // Add momentum scrolling for iOS
                    }}>
                    {/* Add CSS to hide scrollbar for WebKit browsers */}
                    <style>{`
                        div::-webkit-scrollbar {
                            display: none;
                        }
                        .cursor-grabbing {
                            cursor: grabbing;
                        }
                    `}</style>

                    <ul className="flex" style={{ minWidth: `${topDeals.length / visibleItems}%` }}>
                        {topDeals.map((deal, index) => (
                            <li key={index} className="flex-none" style={{ width: itemWidth }}>
                                <Item
                                    img_url={deal.img_url}
                                    title={deal.title}
                                    link_url={deal.link_url}
                                    color={deal.color}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Scroll progress bar - only shown if scrolling is needed */}
            {needsScroll && (
                <div className="mt-3 px-1">
                    <div className="relative w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                        {/* Animated progress indicator */}
                        <div
                            className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-100 ease-out"
                            style={{ width: `${scrollProgress}%` }}
                        ></div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TopDeal;

function Item({ img_url, title, link_url, color }: ITopDealProps) {
    // Using inline styles for text color to avoid Tailwind purge issues
    const textColorStyle = {
        color: color.includes('red') ? '#ef4444' :
            color.includes('blue') ? '#3b82f6' :
                color.includes('green') ? '#10b981' :
                    color.includes('yellow') ? '#eab308' :
                        color.includes('purple') ? '#8b5cf6' :
                            color.includes('pink') ? '#ec4899' :
                                color.includes('indigo') ? '#6366f1' :
                                    color.includes('amber') ? '#f59e0b' : '#000000'
    };

    return (
        <Link to={link_url} className="flex flex-col items-center justify-center text-center px-2 sm:px-4 py-1 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-sm border border-gray-100 group-hover:scale-105 transition-transform duration-300">
                <img src={img_url} alt={title} className="w-full h-full object-cover" />
            </div>
            <span className="text-xs sm:text-sm md:text-md font-bold mt-1 sm:mt-2 overflow-hidden text-ellipsis whitespace-nowrap group-hover:opacity-85" style={textColorStyle}>
                {title}
            </span>
        </Link>
    );
}