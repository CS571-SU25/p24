import { Link, useLocation } from "react-router";
import { useState } from "react";
import tngBadge from "../assets/TNG_badge.svg";

const Navigation = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const location = useLocation();

    const navigationItems = [
        { path: '/', label: 'HOME', id: '001' },
        { path: '/about', label: 'PERSONNEL', id: '002' },
        { path: '/projects', label: 'PROJECTS', id: '003' },
        { path: '/tech-stack', label: 'TECH STACK', id: '004' },
        { path: '/blog', label: 'LOGS', id: '005' }
    ]

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* floating nav sidebar */}
            <nav className={`
                fixed top-0 left-0 h-full z-50
                transition-all duration-700 ease-out
                ${isExpanded ? 'w-80' : 'w-24'}
                p-6
            `}>
                {/* header section - floating glass panel */}
                <div className="mb-8">
                    <div className={`
                        lcars-glass-panel rounded-3xl relative overflow-hidden
                        transition-all duration-700 ease-out
                        ${isExpanded ? 'p-6 mb-4' : 'p-4 mb-6'}
                    `}>
                        <div className="relative z-10">
                            {/* Star Trek Badge + LCARS header */}
                            <div className={`
                                flex items-center
                                transition-all duration-700 ease-out
                                ${isExpanded ? 'mb-4 justify-start' : 'mb-0 justify-center'}
                            `}>
                                {/* TNG Badge - clickable toggle */}
                                <div
                                    className={`
                                        cursor-pointer select-none transition-all duration-700 ease-out
                                        hover:scale-110 hover:rotate-3 hover:drop-shadow-[0_0_20px_rgba(251,146,60,0.6)]
                                        w-12 h-12
                                        relative flex items-center justify-center
                                    `}
                                    onClick={() => setIsExpanded(!isExpanded)}
                                >
                                    {/* Subtle background for visibility */}
                                    <div className="absolute inset-0 rounded-full bg-orange-500/20 backdrop-blur-sm border border-orange-400/30"></div>
                                    
                                    <img 
                                        src={tngBadge} 
                                        alt="TNG Badge"
                                        className="w-full h-full object-contain relative z-10"
                                    />
                                    
                                    {/* Fallback indicator if SVG is invisible
                                    <div className="absolute inset-0 flex items-center justify-center text-orange-400 font-bold text-xs opacity-30 pointer-events-none">
                                        TNG
                                    </div> */}
                                </div>
                                
                                {/* LCARS text - only visible when expanded */}
                                <div className={`
                                    text-white font-black tracking-wider
                                    transition-all duration-700 ease-out overflow-hidden
                                    ${isExpanded ? 'text-3xl ml-4 max-w-full opacity-100' : 'text-xl max-w-0 opacity-0 ml-0'}
                                `}>
                                    <span className="whitespace-nowrap">LCARS</span>
                                </div>
                            </div>
                            
                            {/* Subtitle with smooth height transition */}
                            <div className={`
                                text-blue-300 text-sm opacity-90 tracking-widest font-semibold
                                transition-all duration-700 ease-out overflow-hidden
                                ${isExpanded ? 'max-h-8 opacity-90' : 'max-h-0 opacity-0'}
                            `}>
                                <span className="whitespace-nowrap block">STARFLEET DATABASE</span>
                            </div>
                        </div>
                        
                        {/* animated gradient overlay */}
                        <div className="absolute inset-0 opacity-30 lcars-gradient-animate"></div>
                    </div>

                    {/* status bar with smooth transition */}
                    <div className={`
                        lcars-glass-panel rounded-2xl relative overflow-hidden
                        transition-all duration-700 ease-out
                        ${isExpanded ? 'max-h-20 opacity-100 px-6 py-3' : 'max-h-0 opacity-0 px-0 py-0'}
                    `}>
                        <div className="text-orange-400 text-xs font-bold tracking-widest text-center lcars-glow-orange">
                            <span className="whitespace-nowrap block">AUTHORIZED ACCESS ONLY</span>
                        </div>
                    </div>
                </div>

                {/* nav items - floating buttons with staggered animation */}
                <div className={`
                    space-y-3
                    transition-all duration-700 ease-out
                    ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}>
                    {navigationItems.map((item, index) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`
                                lcars-nav-button group
                                transition-all duration-700 ease-out
                                ${isExpanded ? 'lcars-nav-expanded transform translate-x-0' : 'lcars-nav-collapsed transform -translate-x-full'}
                                ${isActive(item.path) ? 'lcars-nav-active' : ''}
                            `}
                            style={{
                                transitionDelay: isExpanded ? `${index * 0.1}s` : '0s'
                            }}
                        >
                            <div className="relative z-10 flex items-center">
                                <span className="lcars-nav-id">
                                    {item.id}
                                </span>
                                <div className={`
                                    flex-1 text-left ml-4 font-bold tracking-wider
                                    transition-all duration-700 ease-out overflow-hidden whitespace-nowrap
                                    ${isExpanded ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'}
                                `}>
                                    {item.label}
                                </div>
                                {isActive(item.path) && isExpanded && (
                                    <div className={`
                                        lcars-active-indicator
                                        transition-all duration-700 ease-out
                                        ${isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                                    `}></div>
                                )}
                            </div>
                            
                            {/* hover glow effect */}
                            <div className="lcars-button-glow"></div>
                        </Link>
                    ))}
                </div>

                {/* system status panel - floating at bottom with smooth transition */}
                <div className={`
                    absolute bottom-6 left-6 right-6
                    transition-all duration-700 ease-out
                    ${isExpanded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8 pointer-events-none'}
                `}>
                    <div className="lcars-glass-panel rounded-2xl p-4 mb-4">
                        <h3 className="text-purple-400 font-bold text-sm tracking-widest text-center mb-3 lcars-glow-purple">
                            SYSTEM STATUS
                        </h3>
                        
                        <div className="grid grid-cols-3 gap-2">
                            {/* POWER */}
                            <div className="lcars-status-indicator">
                                <span className="text-xs font-semibold text-gray-400">POWER</span>
                                <span className="text-xs font-bold text-green-400 lcars-glow-green">ONLINE</span>
                            </div>
                            
                            {/* SECTOR */}
                            <div className="lcars-status-indicator">
                                <span className="text-xs font-semibold text-gray-400">SECTOR</span>
                                <span className="text-xs font-bold text-blue-400 lcars-glow-blue">SOL-3</span>
                            </div>
                            
                            {/* ACCESS */}
                            <div className="lcars-status-indicator">
                                <span className="text-xs font-semibold text-gray-400">ACCESS</span>
                                <span className="text-xs font-bold text-purple-400 lcars-glow-purple">GUEST</span>
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
            <div className={`transition-all duration-700 ease-out ${isExpanded ? 'ml-80' : 'ml-24'}`}>
                {/* Content goes here */}
            </div>
        </>
    )
}

export default Navigation