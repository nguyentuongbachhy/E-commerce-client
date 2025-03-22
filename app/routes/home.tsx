import { lazy, memo, Suspense, useEffect, useState } from "react";
import { Banner, Sidebar } from "~/components";
import type { Route } from "./+types/home";

// Lazy load component that's not immediately visible
const TopDeal = lazy(() => import("~/components/topDeal"));

// Memoize components to prevent unnecessary re-renders
const MemoizedBanner = memo(Banner);
const MemoizedTopDeal = memo(TopDeal);

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Where you can buy something!" },
  ];
}

export default function Home() {
  // Handle window resize effects only at this level
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Check on initial load
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mobile menu toggle button
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full flex flex-col md:flex-row pb-4 relative">
      {/* Sidebar component - handles its own responsive behavior */}
      <Sidebar
        windowWidth={windowWidth}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {/* Mobile menu button - visible only on small screens */}
      {windowWidth < 768 && (
        <button
          className="md:hidden fixed top-4 left-4 z-30 bg-gray-800 p-2 rounded-md shadow-lg"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Main content */}
      <div className="flex-1 max-w-full md:max-w-6xl mx-auto px-2 sm:px-4 md:px-6 space-y-4 sm:space-y-6 w-full">
        {/* Banner Section */}
        <div className="w-full p-2 sm:p-4 bg-black rounded-md shadow-md">
          <MemoizedBanner />
        </div>

        {/* Top Deal Section */}
        <div className="w-full p-2 sm:p-4 bg-black rounded-md shadow-md">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-4">Top Deals</h2>
          <Suspense fallback={
            <div className="w-full h-24 sm:h-40 bg-gray-800 animate-pulse rounded-md"></div>
          }>
            <MemoizedTopDeal />
          </Suspense>
        </div>

        {/* Flash Sale Section */}
        <div className="w-full p-2 sm:p-4 bg-black rounded-md shadow-md">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-4">Flash Sale</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="bg-gray-800 rounded-md p-2 sm:p-3 hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="aspect-square bg-gray-700 rounded-md mb-2"></div>
                <div className="h-3 sm:h-4 bg-gray-700 rounded w-3/4 mb-1 sm:mb-2"></div>
                <div className="h-4 sm:h-6 bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Categories */}
        <div className="w-full p-2 sm:p-4 bg-black rounded-md shadow-md">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-4">Featured Categories</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
              <div
                key={item}
                className="bg-gray-800 rounded-md p-1 sm:p-2 flex flex-col items-center hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gray-700 mb-1 sm:mb-2"></div>
                <div className="h-2 sm:h-3 bg-gray-700 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}