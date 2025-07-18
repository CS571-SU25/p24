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
            {/* nav sidebar */}
            <nav className={`
                fixed top-0 left-0 h-full bg-black z-40
                transition-all duration-300 ease-in-out
                ${isExpanded ? 'w-80' : 'w-16'}
            `}>
                {/* header section */}
                <div className="relative">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-400 relative overflow-hidden">
                        
                        <div className="flex items-center justify-between px-6 py-6">
                            {isExpanded && (
                                <div>
                                    <div className="text-black font-black text-3xl tracking-wider">
                                        LCARS
                                    </div>
                                    <div className="text-black text-sm opacity-90 tracking-widest font-bold">
                                        STARFLEET DATABASE
                                    </div>
                                </div>
                            )}
                            
                            {/* toggle button - needs tweaking */}
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className={`
                                    bg-blue-500 hover:bg-blue-400 text-black font-black 
                                    transition-all duration-200 tracking-wide shadow-lg
                                    ${isExpanded ? 'px-4 py-2 rounded-lg' : 'w-8 h-8 rounded-lg flex items-center justify-center'}
                                `}
                            >
                                {isExpanded ? '◀ HIDE' : '▶'}
                            </button>
                        </div>
                    </div>

                    {/* status bar */}
                    {isExpanded && (
                        <div className="bg-blue-500 px-6 py-2 relative">
                            <div className="text-black text-xs font-black tracking-widest text-center">
                                AUTHORIZED ACCESS ONLY
                            </div>
                        </div>
                    )}
                </div>

                {/* nav section */}
                <div className="mt-8 px-4">
                    {navigationItems.map((item, index) => (
                        <div key={item.path} className="mb-4">
                            <div className="flex items-center space-x-3">
                                {/* ID panel */}
                                {isExpanded && (
                                    <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                                        <span className="text-orange-400 text-sm ">
                                            {item.id}
                                        </span>
                                    </div>
                                )}
                                
                                {/* main nav button */}
                                <Link
                                    to={item.path}
                                    className={`
                                        block transition-all duration-200 font-black text-sm tracking-wider
                                        relative overflow-hidden
                                        ${isExpanded 
                                            ? 'flex-1 h-12 px-6 rounded-lg flex items-center' 
                                            : 'w-12 h-12 rounded-lg flex items-center justify-center'
                                        }
                                        ${isActive(item.path)
                                            ? 'bg-orange-500 text-black shadow-lg transform scale-105' 
                                            : 'bg-blue-500 hover:bg-blue-400 text-black hover:transform hover:scale-102'
                                        }
                                    `}
                                    style={{ 
                                        color: isActive(item.path) ? '#000000' : '#ffffff'
                                    }}
                                >
                                    {isExpanded ? (
                                        <div className="flex items-center justify-between w-full">
                                            <span className="">{item.label}</span>
                                            {isActive(item.path) && (
                                                <div className="w-2 h-2 bg-black rounded-full"></div>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="font-black font-mono text-xs">
                                            {item.id.slice(-1)}
                                        </span>
                                    )}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* system status panel*/}
                {isExpanded && (
                    <div className="absolute bottom-8 left-4 right-4">
                        <div className="bg-purple-500 rounded-lg px-6 py-3 mb-4 text-center relative overflow-hidden">
                            <span className="text-black font-black text-sm tracking-widest ">
                                SYSTEM STATUS
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-gray-600 rounded-lg px-3 py-2 text-center relative">
                                <span className="text-orange-400 text-xs font-black ">POWER</span>
                            </div>
                            <div className="bg-green-500 rounded-lg px-3 py-2 text-center relative">
                                <span className="text-black text-xs font-black ">ONLINE</span>
                            </div>
                            
                            <div className="bg-gray-600 rounded-lg px-3 py-2 text-center relative">
                                <span className="text-blue-400 text-xs font-black ">SECTOR</span>
                            </div>
                            <div className="bg-blue-500 rounded-lg px-3 py-2 text-center relative">
                                <span className="text-black text-xs font-black ">SOL-3</span>
                            </div>
                            
                            <div className="bg-gray-600 rounded-lg px-3 py-2 text-center">
                                <span className="text-purple-400 text-xs font-black ">ACCESS</span>
                            </div>
                            <div className="bg-purple-500 rounded-lg px-3 py-2 text-center">
                                <span className="text-black text-xs font-black ">GUEST</span>
                            </div>
                        </div>

                        {/* LCARS diagnostic strip */}
                        <div className="mt-4 flex space-x-1">
                            <div className="flex-1 h-2 bg-orange-500 rounded-full"></div>
                            <div className="flex-1 h-2 bg-blue-500 rounded-full"></div>
                            <div className="flex-1 h-2 bg-purple-500 rounded-full"></div>
                            <div className="flex-1 h-2 bg-green-500 rounded-full"></div>
                        </div>
                    </div>
                )}
            </nav>

            {/* content area spacer */}
            <div className={`transition-all duration-300 ${isExpanded ? 'ml-80' : 'ml-16'}`}>
                {/* Content goes here */}
            </div>
        </>
    )
}

export default Navigation