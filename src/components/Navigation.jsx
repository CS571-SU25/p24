import { Link, useLocation } from "react-router";
import { useState, useMemo, useCallback, memo, useEffect } from "react";
import tngBadge from "../assets/TNG_badge.svg";

// Custom hook for mobile detection
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);
    
    return isMobile;
};

const NAVIGATION_ITEMS = [
    { path: '/', label: 'HOME', id: '001' },
    { path: '/about', label: 'PERSONNEL', id: '002' },
    { path: '/projects', label: 'PROJECTS', id: '003' },
    { path: '/tech-stack', label: 'TECH STACK', id: '004' },
    { path: '/blog', label: 'LOGS', id: '005' }
];

// Mobile Navigation Item (simplified and optimized)
const MobileNavigationItem = memo(({ item, isActive, onClick }) => {
    return (
        <Link
            to={item.path}
            onClick={onClick}
            className={`
                block px-4 py-3 text-left font-bold tracking-wider
                transition-all duration-300 ease-out
                border-l-4 border-transparent
                ${isActive(item.path) 
                    ? 'bg-orange-400/20 border-orange-400 text-orange-400' 
                    : 'text-white hover:bg-blue-400/10 hover:border-blue-400'
                }
            `}
        >
            <span className="text-xs text-gray-400 mr-3">{item.id}</span>
            {item.label}
        </Link>
    );
});

// Desktop Navigation Item (original complex version)
const DesktopNavigationItem = memo(({ item, index, isExpanded, isActive, getTransitionDelay }) => {
    const linkClassName = useMemo(() => `
        lcars-nav-button group
        transition-all duration-1000 cubic-bezier(0.25, 0.46, 0.45, 0.94)
        ${isExpanded ? 'lcars-nav-expanded transform translate-x-0 scale-100' : 'lcars-nav-collapsed transform translate-x-0 scale-0'}
        ${isActive(item.path) ? 'lcars-nav-active' : ''}
    `, [isExpanded, isActive, item.path]);

    const labelClassName = useMemo(() => `
        flex-1 text-left ml-4 font-bold tracking-wider
        transition-all duration-1000 cubic-bezier(0.25, 0.46, 0.45, 0.94) overflow-hidden whitespace-nowrap
        ${isExpanded ? 'max-w-full transform scale-100' : 'max-w-0 transform scale-0'}
    `, [isExpanded]);

    const indicatorClassName = useMemo(() => `
        lcars-active-indicator
        transition-all duration-1000 cubic-bezier(0.25, 0.46, 0.45, 0.94)
        ${isExpanded ? 'transform scale-100' : 'transform scale-0'}
    `, [isExpanded]);

    return (
        <Link
            key={item.path}
            to={item.path}
            className={linkClassName}
            style={getTransitionDelay(index)}
        >
            <div className="relative z-10 flex items-center">
                <span className="lcars-nav-id">
                    {item.id}
                </span>
                <div className={labelClassName}>
                    {item.label}
                </div>
                {isActive(item.path) && isExpanded && (
                    <div className={indicatorClassName}></div>
                )}
            </div>
            
            <div className="lcars-button-glow"></div>
        </Link>
    );
});

const Navigation = memo(() => {
    const [isExpanded, setIsExpanded] = useState(false);
    const location = useLocation();
    const isMobile = useIsMobile();

    const toggleExpanded = useCallback(() => {
        setIsExpanded(prev => !prev);
    }, []);

    const closeMobileMenu = useCallback(() => {
        if (isMobile) {
            setIsExpanded(false);
        }
    }, [isMobile]);

    const isActive = useCallback((path) => location.pathname === path, [location.pathname]);

    // Close mobile menu when location changes
    useEffect(() => {
        if (isMobile && isExpanded) {
            setIsExpanded(false);
        }
    }, [location.pathname, isMobile]);

    // Mobile Navigation Component
    if (isMobile) {
        return (
            <>
                {/* Mobile Header */}
                <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-orange-400/30">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center">
                            <img 
                                src={tngBadge} 
                                alt="TNG Badge"
                                className="w-8 h-8 mr-3"
                            />
                            <span className="text-white font-bold text-lg tracking-wider">LCARS</span>
                        </div>
                        <button
                            onClick={toggleExpanded}
                            className="w-10 h-10 flex flex-col items-center justify-center space-y-1 transition-all duration-300"
                            aria-label="Toggle navigation menu"
                        >
                            <div className={`w-6 h-0.5 bg-orange-400 transition-all duration-300 ${isExpanded ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                            <div className={`w-6 h-0.5 bg-orange-400 transition-all duration-300 ${isExpanded ? 'opacity-0' : ''}`}></div>
                            <div className={`w-6 h-0.5 bg-orange-400 transition-all duration-300 ${isExpanded ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isExpanded && (
                    <div 
                        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                        onClick={closeMobileMenu}
                    />
                )}

                {/* Mobile Menu */}
                <div className={`
                    fixed top-16 left-0 right-0 z-40 bg-gray-900/98 backdrop-blur-md border-b border-orange-400/30
                    transform transition-all duration-300 ease-out
                    ${isExpanded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
                `}>
                    <div className="p-2">
                        {NAVIGATION_ITEMS.map((item) => (
                            <MobileNavigationItem
                                key={item.path}
                                item={item}
                                isActive={isActive}
                                onClick={closeMobileMenu}
                            />
                        ))}
                    </div>
                    
                    {/* Mobile Status */}
                    <div className="px-4 py-3 border-t border-gray-700/50">
                        <div className="text-xs text-gray-400 mb-2 tracking-widest">SYSTEM STATUS</div>
                        <div className="flex flex-wrap gap-4 text-xs">
                            <span className="text-green-400">POWER: ONLINE</span>
                            <span className="text-blue-400">SECTOR: SOL-3</span>
                            <span className="text-purple-400">ACCESS: GUEST</span>
                        </div>
                    </div>
                </div>

                {/* Mobile Content Spacer */}
                <div className="pt-16" />
            </>
        );
    }

    // Desktop Navigation (existing complex version)
    const navClassName = useMemo(() => `
        fixed top-0 left-0 h-full z-50
        transition-all duration-1000 cubic-bezier(0.25, 0.46, 0.45, 0.94)
        ${isExpanded ? 'w-80' : 'w-24'}
        p-6
    `, [isExpanded]);

    const lcarsContainerClassName = useMemo(() => `
        lcars-glass-panel rounded-3xl relative overflow-hidden
        transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1)
        ${isExpanded ? 'transform scale-100' : 'transform scale-0'}
        p-6 mb-4
    `, [isExpanded]);

    const lcarsTextClassName = useMemo(() => `
        text-white font-black tracking-wider text-3xl ml-4
        transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1)
        ${isExpanded ? 'transform scale-100' : 'transform scale-0'}
    `, [isExpanded]);

    const subtitleClassName = useMemo(() => `
        text-blue-300 text-sm opacity-90 tracking-widest font-semibold
        transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1)
        ${isExpanded ? 'transform scale-100' : 'transform scale-0'}
    `, [isExpanded]);

    const statusBarClassName = useMemo(() => `
        lcars-glass-panel rounded-2xl relative overflow-hidden
        transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1)
        ${isExpanded ? 'transform scale-100 px-6 py-3' : 'transform scale-0 px-0 py-0 pointer-events-none'}
    `, [isExpanded]);

    const navItemsClassName = useMemo(() => `
        space-y-3
        transition-all duration-1000 ease-out
        ${isExpanded ? 'transform translate-x-0 scale-100' : 'transform translate-x-0 scale-0 pointer-events-none'}
    `, [isExpanded]);

    const systemStatusClassName = useMemo(() => `
        absolute bottom-6 left-6 right-6
        transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1)
        ${isExpanded ? 'transform translate-y-0 scale-100' : 'transform translate-y-8 scale-0 pointer-events-none'}
    `, [isExpanded]);

    const contentSpacerClassName = useMemo(() => `
        transition-all duration-1000 cubic-bezier(0.25, 0.46, 0.45, 0.94) ${isExpanded ? 'ml-80' : 'ml-24'}
    `, [isExpanded]);

    const getTransitionDelay = useCallback((index) => {
        const totalItems = NAVIGATION_ITEMS.length;
        const expandDelay = index * 0.15;
        const collapseDelay = (totalItems - 1 - index) * 0.15;
        
        return {
            transitionDelay: isExpanded ? `${expandDelay}s` : `${collapseDelay}s`
        };
    }, [isExpanded]);

    const statusHeaderClassName = useMemo(() => `
        text-center mb-3
        transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1)
        ${isExpanded ? 'transform scale-100' : 'transform scale-0'}
    `, [isExpanded]);

    const statusGridClassName = useMemo(() => `
        grid grid-cols-3 gap-2
        transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1)
        ${isExpanded ? 'transform scale-100' : 'transform scale-0'}
    `, [isExpanded]);

    return (
        <>
            {/* floating nav sidebar */}
            <nav className={navClassName}>
                {/* Header section with fixed communicator position */}
                <div className="mb-8 relative">
                    {/* Fixed Communicator Badge - OUTSIDE the container, always visible */}
                    <div
                        className="cursor-pointer select-none absolute top-6 left-6 z-30
                                   hover:scale-110 hover:rotate-3 hover:drop-shadow-[0_0_20px_rgba(251,146,60,0.6)]
                                   w-12 h-12 flex items-center justify-center
                                   transition-transform duration-300 ease-out"
                        onClick={toggleExpanded}
                    >
                        {/* Subtle background for visibility */}
                        <div className="absolute inset-0 rounded-full lcars-nav-active backdrop-blur-sm border border-orange-400/30"></div>
                        
                        <img 
                            src={tngBadge} 
                            alt="TNG Badge"
                            className="w-full h-full object-contain relative z-10"
                        />
                    </div>

                    {/* LCARS container - always present but invisible when collapsed */}
                    <div className={lcarsContainerClassName}>
                        <div className="relative z-10">
                            {/* container for badge space and text */}
                            <div className="flex items-center mb-4">
                                {/* space reserved for the external badge */}
                                <div className="w-12 h-12 flex-shrink-0"></div>
                                
                                {/* LCARS text - fades in next to badge */}
                                <div className={lcarsTextClassName}>
                                    <span className="whitespace-nowrap">LCARS</span>
                                </div>
                            </div>
                            
                            {/* Subtitle - fades in below */}
                            <div className={subtitleClassName}>
                                <span className="whitespace-nowrap block">STARFLEET DATABASE</span>
                            </div>
                        </div>
                        
                        {/* animated gradient overlay */}
                        <div className="absolute inset-0 opacity-30 lcars-gradient-animate"></div>
                    </div>

                    {/* status bar - fades in when expanded */}
                    <div className={statusBarClassName}>
                        <div className="text-orange-400 text-xs font-bold tracking-widest text-center lcars-glow-orange">
                            <span className="whitespace-nowrap block">AUTHORIZED ACCESS ONLY</span>
                        </div>
                    </div>
                </div>

                {/* nav items - floating buttons with staggered animation */}
                <div className={navItemsClassName}>
                    {NAVIGATION_ITEMS.map((item, index) => (
                        <DesktopNavigationItem
                            key={item.path}
                            item={item}
                            index={index}
                            isExpanded={isExpanded}
                            isActive={isActive}
                            getTransitionDelay={getTransitionDelay}
                        />
                    ))}
                </div>

                {/* system status panel - floating at bottom with smooth transition */}
                <div className={systemStatusClassName}>
                    
                    <div className="lcars-glass-panel rounded-2xl p-4 mb-4">
                        <div className={statusHeaderClassName}>
                            <h3 className="text-purple-400 font-bold text-sm tracking-widest lcars-glow-purple whitespace-nowrap">
                                SYSTEM STATUS
                            </h3>
                        </div>
                        
                        <div className={statusGridClassName}>
                            {/* POWER */}
                            <div className="lcars-status-indicator">
                                <span className="text-xs font-semibold text-gray-400 whitespace-nowrap">POWER</span>
                                <span className="text-xs font-bold text-green-400 lcars-glow-green whitespace-nowrap">ONLINE</span>
                            </div>
                            
                            {/* SECTOR */}
                            <div className="lcars-status-indicator">
                                <span className="text-xs font-semibold text-gray-400 whitespace-nowrap">SECTOR</span>
                                <span className="text-xs font-bold text-blue-400 lcars-glow-blue whitespace-nowrap">SOL-3</span>
                            </div>
                            
                            {/* ACCESS */}
                            <div className="lcars-status-indicator">
                                <span className="text-xs font-semibold text-gray-400 whitespace-nowrap">ACCESS</span>
                                <span className="text-xs font-bold text-purple-400 lcars-glow-purple whitespace-nowrap">GUEST</span>
                            </div>
                        </div>
                    </div>

                    {/* LCARS diagnostic strip */}
                    <div className="flex space-x-2">
                        <div className="flex-1 h-1 rounded-full lcars-diagnostic-orange"></div>
                        <div className="flex-1 h-1 rounded-full lcars-diagnostic-blue"></div>
                        <div className="flex-1 h-1 rounded-full lcars-diagnostic-purple"></div>
                        <div className="flex-1 h-1 rounded-full lcars-diagnostic-green"></div>
                    </div>
                </div>
            </nav>

            {/* content area spacer with smooth transition */}
            <div className={contentSpacerClassName}>
                {/* Content goes here */}
            </div>
        </>
    );
});

export default Navigation