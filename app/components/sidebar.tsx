import {
    Baby,
    BookOpen,
    Briefcase,
    Camera,
    Car,
    ChevronDown,
    Footprints,
    Gift,
    Heart,
    Home,
    Laptop,
    Music,
    PenTool,
    Phone,
    Search,
    Shirt,
    ShoppingBag,
    ShoppingBasket,
    ShoppingCart,
    Tent,
    Tv,
    Watch,
    X,
    Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

// Danh sách categories
const categories = [
    { 'category': '8322', 'urlKey': 'nha-sach-tiki', 'name': 'Nhà Sách Tiki', 'icon': BookOpen },
    { 'category': '1883', 'urlKey': 'nha-cua-doi-song', 'name': 'Nhà Cửa - Đời Sống', 'icon': Home },
    { 'category': '1789', 'urlKey': 'dien-thoai-may-tinh-bang', 'name': 'Điện Thoại - Máy Tính Bảng', 'icon': Phone },
    { 'category': '2549', 'urlKey': 'do-choi-me-be', 'name': 'Đồ Chơi - Mẹ & Bé', 'icon': Baby },
    { 'category': '1815', 'urlKey': 'thiet-bi-kts-phu-kien-so', 'name': 'Thiết Bị Số - Phụ Kiện Số', 'icon': Tv },
    { 'category': '1882', 'urlKey': 'dien-gia-dung', 'name': 'Điện Gia Dụng', 'icon': Zap },
    { 'category': '1520', 'urlKey': 'lam-dep-suc-khoe', 'name': 'Làm Đẹp - Sức Khỏe', 'icon': Heart },
    { 'category': '8594', 'urlKey': 'o-to-xe-may-xe-dap', 'name': 'Ô Tô - Xe Máy - Xe Đạp', 'icon': Car },
    { 'category': '931', 'urlKey': 'thoi-trang-nu', 'name': 'Thời trang nữ', 'icon': Shirt },
    { 'category': '4384', 'urlKey': 'bach-hoa-online', 'name': 'Bách Hóa Online', 'icon': ShoppingCart },
    { 'category': '1975', 'urlKey': 'the-thao-da-ngoai', 'name': 'Thể Thao - Dã Ngoại', 'icon': Tent },
    { 'category': '915', 'urlKey': 'thoi-trang-nam', 'name': 'Thời trang nam', 'icon': Music },
    { 'category': '17166', 'urlKey': 'cross-border-hang-quoc-te', 'name': 'Cross Border - Hàng Quốc Tế', 'icon': ShoppingBag },
    { 'category': '1846', 'urlKey': 'laptop-may-vi-tinh-linh-kien', 'name': 'Laptop - Máy Vi Tính - Linh kiện', 'icon': Laptop },
    { 'category': '1686', 'urlKey': 'giay-dep-nam', 'name': 'Giày - Dép nam', 'icon': Footprints },
    { 'category': '4221', 'urlKey': 'dien-tu-dien-lanh', 'name': 'Điện Tử - Điện Lạnh', 'icon': Tv },
    { 'category': '1703', 'urlKey': 'giay-dep-nu', 'name': 'Giày - Dép nữ', 'icon': Footprints },
    { 'category': '1801', 'urlKey': 'may-anh', 'name': 'Máy Ảnh - Máy Quay Phim', 'icon': Camera },
    { 'category': '27498', 'urlKey': 'phu-kien-thoi-trang', 'name': 'Phụ kiện thời trang', 'icon': PenTool },
    { 'category': '44792', 'urlKey': 'ngon', 'name': 'NGON', 'icon': ShoppingBasket },
    { 'category': '8371', 'urlKey': 'dong-ho-va-trang-suc', 'name': 'Đồng hồ và Trang sức', 'icon': Watch },
    { 'category': '6000', 'urlKey': 'balo-va-vali', 'name': 'Balo và Vali', 'icon': Briefcase },
    { 'category': '11312', 'urlKey': 'voucher-dich-vu', 'name': 'Voucher - Dịch vụ', 'icon': Gift },
    { 'category': '976', 'urlKey': 'tui-vi-nu', 'name': 'Túi thời trang nữ', 'icon': ShoppingBag },
    { 'category': '27616', 'urlKey': 'tui-thoi-trang-nam', 'name': 'Túi thời trang nam', 'icon': ShoppingBag },
    { 'category': '15078', 'urlKey': 'cham-soc-nha-cua', 'name': 'Chăm sóc nhà cửa', 'icon': Home },
];

// Tạo CSS cho việc ẩn scrollbar và animations
const sidebarStyles = `
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
    
    @keyframes slideInLeft {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
    }
    
    @keyframes slideOutLeft {
        from { transform: translateX(0); }
        to { transform: translateX(-100%); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .slide-in {
        animation: slideInLeft 0.3s ease-out forwards;
    }
    
    .slide-out {
        animation: slideOutLeft 0.3s ease-out forwards;
    }
    
    .fade-in {
        animation: fadeIn 0.3s ease-out forwards;
    }
    
    .fade-out {
        animation: fadeOut 0.3s ease-out forwards;
    }
`;

// Breakpoint cho tablet và desktop
const TABLET_BREAKPOINT = 768; // 768px trở lên là tablet
const DESKTOP_BREAKPOINT = 1024; // 1024px trở lên là desktop

interface SidebarProps {
    windowWidth: number;
    menuOpen: boolean;
    setMenuOpen: (open: boolean) => void;
}

function Sidebar({ windowWidth, menuOpen, setMenuOpen }: SidebarProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('');
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Trạng thái animation
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationClass, setAnimationClass] = useState('');

    // Xử lý responsive sidebar states dựa trên kích thước màn hình
    useEffect(() => {
        // Desktop (≥1024px): Always expanded
        // Tablet (768px-1023px): Always collapsed to icons
        // Mobile (<768px): Hidden by default, shown on demand
        if (windowWidth >= DESKTOP_BREAKPOINT) {
            setIsCollapsed(false); // Luôn mở rộng trên desktop
        } else if (windowWidth >= TABLET_BREAKPOINT) {
            setIsCollapsed(true); // Luôn thu gọn thành icon trên tablet
        }

        // Thêm CSS cho animations
        const styleElement = document.createElement('style');
        styleElement.textContent = sidebarStyles;
        document.head.appendChild(styleElement);

        // Cleanup
        return () => {
            document.head.removeChild(styleElement);
        };
    }, [windowWidth]);

    // Xử lý việc đóng/mở trên mobile
    useEffect(() => {
        if (windowWidth < TABLET_BREAKPOINT) {
            if (menuOpen) {
                // Mở sidebar với animation
                setAnimationClass('slide-in');
                setIsAnimating(true);

                // Sau khi animation hoàn tất, reset trạng thái animation
                setTimeout(() => {
                    setIsAnimating(false);
                }, 300);
            } else {
                // Nếu đang hiển thị, cần animation đóng
                if (animationClass === 'slide-in' && !isAnimating) {
                    setAnimationClass('slide-out');
                    setIsAnimating(true);

                    // Sau khi animation hoàn tất, reset
                    setTimeout(() => {
                        setIsAnimating(false);
                    }, 300);
                }
            }
        }
    }, [menuOpen, windowWidth]);

    // Toggle sidebar trên tablet và desktop
    const toggleSidebar = () => {
        if (windowWidth >= TABLET_BREAKPOINT) {
            setIsCollapsed(!isCollapsed);
        }
    };

    // Đóng sidebar trên mobile
    const closeMobileSidebar = () => {
        if (windowWidth < TABLET_BREAKPOINT) {
            setMenuOpen(false);
        }
    };

    // Lọc categories theo từ khóa tìm kiếm
    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Hiển thị tất cả hoặc chỉ một số categories
    const displayCategories = showAllCategories
        ? filteredCategories
        : filteredCategories.slice(0, 10);

    // Kiểm tra xem sidebar có nên hiển thị không
    // Trên mobile: chỉ hiển thị khi menuOpen = true
    // Trên tablet và desktop: luôn hiển thị
    const shouldShowSidebar = windowWidth >= TABLET_BREAKPOINT || menuOpen;

    if (!shouldShowSidebar) {
        return null; // Không hiển thị gì nếu đang ở mobile và không mở menu
    }

    // Xác định xem có phải là mobile không
    const isMobile = windowWidth < TABLET_BREAKPOINT;

    return (
        <>
            {/* Mobile overlay */}
            {isMobile && (
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${menuOpen ? 'fade-in' : 'fade-out'}`}
                    onClick={closeMobileSidebar}
                ></div>
            )}

            {/* Sidebar container */}
            <div
                className={`
                    ${isMobile ? `fixed left-0 top-0 z-50 ${animationClass}` : isCollapsed ? 'w-16' : 'w-64'} 
                    transition-all duration-300 ease-in-out 
                    ${!isMobile ? (isCollapsed ? 'w-16' : 'w-64') : 'w-64'}
                    ${!isMobile ? 'sticky self-start top-0' : ''}
                `}
            >
                <div className="bg-gray-900 shadow-lg rounded-lg overflow-hidden h-screen">
                    {/* Sidebar Header - Sticky */}
                    <div className="sticky top-0 z-10 p-4 border-b border-gray-800 bg-gray-900 flex justify-between items-center rounded-t-lg">
                        {(!isCollapsed || isMobile) && (
                            <h2 className="text-xl font-semibold text-white">Danh Mục</h2>
                        )}

                        {/* Toggle button (desktop/tablet) */}
                        {/* {!isMobile && (
                            <button
                                onClick={toggleSidebar}
                                className={`p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-white transition-colors
                                    ${isCollapsed ? 'mx-auto' : ''}`}
                                aria-label={isCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
                            >
                                {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                            </button>
                        )} */}

                        {/* Close button (mobile) */}
                        {isMobile && (
                            <button
                                onClick={closeMobileSidebar}
                                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors"
                                aria-label="Đóng menu"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* Search Input - Sticky */}
                    {(!isCollapsed || isMobile) && (
                        <div className="sticky top-16 z-10 bg-gray-900 p-4 border-b border-gray-800 text-white">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Tìm danh mục..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white placeholder-gray-400"
                                />
                                <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
                            </div>
                        </div>
                    )}

                    {/* Categories List - Scrollable Area */}
                    <div className="overflow-y-auto scrollbar-hide"
                        style={{
                            height: isCollapsed && !isMobile
                                ? 'calc(100vh - 70px)'
                                : 'calc(100vh - 140px)'
                        }}>
                        <div className="p-2">
                            {displayCategories.map((cat) => {
                                const IconComponent = cat.icon;
                                return (
                                    <Link
                                        key={cat.category}
                                        to={`/category/${cat.urlKey}/c${cat.category}`}
                                        state={{ categoryName: cat.name }}
                                        className={`flex items-center p-3 rounded-lg mb-1 transition-all
                                            ${activeCategory === cat.category
                                                ? 'bg-blue-600 text-white'
                                                : 'text-white hover:bg-gray-800'}`}
                                        onClick={() => {
                                            setActiveCategory(cat.category);
                                            // Đóng sidebar sau khi chọn danh mục nếu đang ở mobile
                                            if (isMobile) {
                                                closeMobileSidebar();
                                            }
                                        }}
                                    >
                                        <IconComponent className={`${isCollapsed && !isMobile ? 'mx-auto' : 'mr-3'} w-5 h-5`} />
                                        {(!isCollapsed || isMobile) && (
                                            <span className="text-sm font-medium truncate">{cat.name}</span>
                                        )}
                                    </Link>
                                );
                            })}

                            {/* Show More/Less Button */}
                            {(!isCollapsed || isMobile) && filteredCategories.length > 10 && (
                                <button
                                    className="flex items-center justify-center w-full p-2 mt-2 text-blue-400 hover:bg-gray-800 rounded-lg transition-all cursor-pointer"
                                    onClick={() => setShowAllCategories(!showAllCategories)}
                                >
                                    <span className="text-sm font-medium">
                                        {showAllCategories ? 'Hiển thị ít hơn' : 'Xem tất cả'}
                                    </span>
                                    <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${showAllCategories ? 'rotate-180' : ''}`} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;