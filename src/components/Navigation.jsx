import { Link, useLocation } from "react-router";
import { useState } from "react";

const Navigation = () => {
    const [isExpanded, setIsExpanded] = useState(true);
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
            {/* Navigation Sidebar */}
            <nav className={`
                fixed top-0 left-0 h-full bg-black z-40
                transition-all duration-300 ease-in-out
                ${isExpanded ? 'w-80' : 'w-20'}
            `}>
                {/* LCARS Header Section */}
                <div className="relative">
                    {/* Main Header Panel */}
                    <div className="bg-orange-500 relative">
                        <div className="flex items-center justify-between px-6 py-4">
                            {isExpanded && (
                                <div>
                                    <div className="text-black font-bold text-2xl tracking-wider">LCARS</div>
                                    <div className="text-black text-sm opacity-90 tracking-wide">STARFLEET DATABASE</div>
                                </div>
                            )}
                            
                            {/* Toggle Button - Integrated into header */}
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-full transition-all duration-200 text-sm tracking-wide shadow-lg"
                            >
                                {isExpanded ? '◀ HIDE' : '▶'}
                            </button>
                        </div>
                        
                        {/* Characteristic LCARS cutout
                        <div className="absolute -bottom-4 right-0 w-8 h-8 bg-black rounded-full"></div> */}
                    </div>

                    {/* Subtitle Panel */}
                    {isExpanded && (
                        <div className="bg-blue-600 px-6 py-3">
                            <div className="text-white text-sm font-semibold tracking-wide">
                                AUTHORIZED ACCESS ONLY
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation Section */}
                <div className="mt-8 px-6">
                    {navigationItems.map((item) => (
                        <div key={item.path} className="mb-3">
                            <div className="flex items-center">
                                {/* ID Display */}
                                {isExpanded && (
                                    <div className="text-orange-400 font-mono text-sm font-bold w-12 text-right mr-4">
                                        {item.id}
                                    </div>
                                )}
                                
                                {/* Navigation Button */}
                                <Link
                                    to={item.path}
                                    className={`
                                        block transition-all duration-200 font-bold text-sm tracking-wide
                                        ${isExpanded 
                                            ? 'flex-1 px-8 py-4 rounded-r-full rounded-l-full' 
                                            : 'w-8 h-8 rounded-full flex items-center justify-center text-xs'
                                        }
                                        ${isActive(item.path)
                                            ? 'bg-orange-500 text-black shadow-lg transform scale-105'
                                            : 'bg-blue-600 hover:bg-blue-500 text-white hover:transform hover:scale-102'
                                        }
                                    `}
                                    style={{ 
                                        color: isActive(item.path) ? '#000000' : '#ffffff'
                                    }}
                                >
                                    {isExpanded ? (
                                        <div className="flex items-center justify-between">
                                            <span className="uppercase">{item.label}</span>
                                            {isActive(item.path) && (
                                                <div className="w-3 h-3 bg-black rounded-full"></div>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="font-bold">
                                            {item.id.slice(-1)}
                                        </span>
                                    )}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* System Status Panel */}
                {isExpanded && (
                    <div className="absolute bottom-8 left-6 right-6">
                        {/* Status Header */}
                        <div className="bg-purple-600 rounded-full px-6 py-3 mb-6 text-center">
                            <span className="text-white font-bold text-sm tracking-wide uppercase">
                                System Status
                            </span>
                        </div>

                        {/* Status Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gray-700 rounded-full px-4 py-2 text-center">
                                <span className="text-white text-xs font-bold">POWER</span>
                            </div>
                            <div className="bg-green-500 rounded-full px-4 py-2 text-center">
                                <span className="text-black text-xs font-bold">ONLINE</span>
                            </div>
                            
                            <div className="bg-gray-700 rounded-full px-4 py-2 text-center">
                                <span className="text-white text-xs font-bold">SECTOR</span>
                            </div>
                            <div className="bg-blue-500 rounded-full px-4 py-2 text-center">
                                <span className="text-white text-xs font-bold">SOL-3</span>
                            </div>
                            
                            <div className="bg-gray-700 rounded-full px-4 py-2 text-center">
                                <span className="text-white text-xs font-bold">ACCESS</span>
                            </div>
                            <div className="bg-purple-500 rounded-full px-4 py-2 text-center">
                                <span className="text-white text-xs font-bold">GUEST</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* LCARS Accent Lines */}
                <div className="absolute bottom-0 left-0 right-0">
                    <div className="h-2 bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500 opacity-80"></div>
                </div>
            </nav>

            {/* Content Area Spacer */}
            <div className={`transition-all duration-300 ${isExpanded ? 'ml-80' : 'ml-20'}`}>
                {/* Content goes here */}
            </div>
        </>
    )
}

export default Navigation