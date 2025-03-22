import {
    Heart,
    Search,
    ShoppingCart,
    User,
    X
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from "react-router";
import { useAppSelector } from "~/hooks/reduxHooks";
import { selectIsLogged } from "~/redux/reducers/authReducer";
import type { NavItem } from "~/types/types";

function Header() {
    const isLogged = useAppSelector(selectIsLogged);
    const location = useLocation();
    const [searchOpen, setSearchOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const navItems: NavItem[] = [
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
        { name: "About", path: "/about" }
    ];

    const isActive = (path: string): boolean => {
        if (path === "/" && location.pathname === "/") {
            return true;
        }
        return path !== "/" && location.pathname.includes(path);
    };

    // Toggle search dropdown
    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
        // Focus on input when opening
        if (!searchOpen) {
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100);
        }
    };

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full h-full flex justify-between items-center px-2 md:px-[calc(50%-45rem)] bg-black mx-auto">
            {/* Logo */}
            <div id="logo">
                <p className="text-2xl sm:text-3xl font-bold text-white">
                    E-Commerce
                </p>
            </div>

            {/* Navigation Menu - Only visible on md screens and up */}
            <div id="shortcut" className="block">
                <ul className="flex list-none space-x-8 md:space-x-12 font-medium text-xl">
                    {navItems.map((item) => (
                        <li key={item.name} className="cursor-pointer relative">
                            <Link to={item.path}>
                                <p className={`transition-colors duration-200 ${isActive(item.path) ? "text-white" : "text-gray-400 hover:text-white"}`}>
                                    {item.name}
                                </p>
                                {isActive(item.path) && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white transition-all duration-300 ease-in-out" />
                                )}
                            </Link>
                        </li>
                    ))}

                    {!isLogged && (
                        <li className="cursor-pointer relative">
                            <Link to="/register">
                                <p className="text-gray-400 hover:text-white transition-colors duration-200">Signup</p>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>

            {/* Features Section */}
            <div className="flex items-center gap-2 sm:gap-4 justify-between" id="feature">
                {/* Search Component */}
                <div className="relative" ref={searchRef}>
                    {/* Mobile Search Icon */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleSearch}
                            className="text-white hover:text-blue-400 transition-colors duration-200 p-1"
                            aria-label="Search"
                        >
                            <Search size={26} />
                        </button>

                        {/* Mobile Search Dropdown */}
                        {searchOpen && (
                            <div className="absolute right-0 top-full mt-2 z-20">
                                <div className="bg-gray-800 p-3 rounded-md shadow-lg border border-gray-700">
                                    <div className="relative">
                                        <input
                                            ref={searchInputRef}
                                            type="text"
                                            placeholder="Search..."
                                            className="pl-9 pr-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                                        />
                                        <Search className="absolute left-2.5 top-2.5 text-gray-400" size={18} />
                                        <button
                                            className="absolute right-2 top-2 text-gray-400 hover:text-white"
                                            onClick={() => setSearchOpen(false)}
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Desktop Search Input */}
                    <div className="hidden md:block relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-9 pr-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="absolute left-2.5 top-2.5 text-gray-400" size={20} />
                    </div>
                </div>

                {/* Favorites Icon */}
                <div className="text-white cursor-pointer hover:text-pink-400 transition-colors duration-200">
                    <Heart size={26} />
                </div>

                {/* Cart Icon */}
                <div className="text-white cursor-pointer hover:text-blue-400 transition-colors duration-200">
                    <ShoppingCart size={26} />
                </div>

                {/* User Profile Icon (Only when logged in) */}
                {isLogged && (
                    <div className="text-white cursor-pointer hover:text-gray-200 transition-colors duration-200">
                        <User size={26} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;