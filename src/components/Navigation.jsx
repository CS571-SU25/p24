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
                ${isExpanded ? `w-80` : `w-20`}
                `}>
                {/* LCARS header panel */}
                <div className="relative">
                    {/* top horizontal bar */}
                    <div className="h-12 bg-gradient-to-r from-orange-500 to-orange-400 relative">
                        <div className="absolute right-0 top-0 w-16 h-12 bg-black rounded-bl-3xl"></div>
                        <div className="pl-6 pt-2">
                            <span className="text-black font-bold text-lg tracking-wider">LCARS</span>
                        </div>
                    </div>
                    {/* vertical orange bar */}
                    <div className="absolute top-0 left-0 w-6 h-32 bg-gradient-to-b from-orange-500 to-orange-400"></div>
                    {/* header info panel */}
                    {isExpanded && (
                        <div className="ml-8 mt-4 mb-6">
                            <div className="text-orange-400 font-bold text-sm tracking-widest"> STARFLEET DATABASE</div>
                            <div className="text-blue-400 text-xs mt-1">AUTHORIZED ACCESS ONLY</div>
                        </div>
                    )}
                </div>

                {/* navigation items */}
                <div className="mt-8 ml-6 space-y-1">
                    {navigationItems.map((item, index) => (
                        <div key={item.path} className="flex items-center">
                            {/* ID numbers on left */}
                            <div className="w-12 text-right pr-3">
                                <span className="text-orange-400 font-mono text-sm font-bold">
                                    {item.id}
                                </span>
                            </div>
                            {/* nav button */}
                            <Link
                                to={item.path}
                                className={`
                                        relative block rounded-full transition-all duration-200
                                        ${isActive(item.path)
                                        ? 'bg-orange-500 text-black'
                                        : 'bg-blue-500 hover:bg-blue-400 text-white'
                                    }
                                        ${isExpanded ? 'w-56 px-6 py-3' : 'w-12 h-12'}
                                    `}
                            >
                                {isExpanded && (
                                    <span className="font-bold text-sm tracking-wide uppercase">
                                        {item.label}
                                    </span>
                                )}
                                {/* active page indicator */}
                                {isActive(item.path) && (
                                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-black rounded-full"></div>
                                )}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* bottom status panel */}
                {isExpanded && (
                    <div className="absolute bottom-6 left-6 right-6">
                        {/* Status header */}
                        <div className="bg-purple-500 rounded-full px-4 py-2 mb-3">
                            <span className="text-white font-bold text-sm tracking-wide">SYSTEM STATUS</span>
                        </div>

                        {/* Status items */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="bg-gray-600 rounded-full px-3 py-1 w-24">
                                    <span className="text-white text-xs font-bold">POWER</span>
                                </div>
                                <div className="bg-green-500 rounded-full px-3 py-1">
                                    <span className="text-black text-xs font-bold">ONLINE</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="bg-gray-600 rounded-full px-3 py-1 w-24">
                                    <span className="text-white text-xs font-bold">LOCATION</span>
                                </div>
                                <div className="bg-blue-500 rounded-full px-3 py-1">
                                    <span className="text-white text-xs font-bold">SOL-3</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="bg-gray-600 rounded-full px-3 py-1 w-24">
                                    <span className="text-white text-xs font-bold">ACCESS</span>
                                </div>
                                <div className="bg-purple-500 rounded-full px-3 py-1">
                                    <span className="text-white text-xs font-bold">GUEST</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* expand/collapse toggle */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`
                        absolute top-20 transition-all duration-300
                        ${isExpanded ? `right-4` : `right-2`}
                        bg-orange-500 hover:bg-orange-400 text-black
                        w-8 h-8 rounded-full font-bold text-sm
                        flex items-center justify-center
                        `}
                >
                    {isExpanded ? '◀' : '▶'}
                </button>

                {/* bottom decorative elements */}
                <div className="absolute bottom-0 left-0 right-0">
                    <div className="h-6 bg-gradient-to-r from-purple-500 to-blue-500 relative">
                        <div className="absolute left-0 top-0 w-16 h-6 bg-black rounded-tr-3xl"></div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-6 h-16 bg-gradient-to-t from-purple-500 to-blue-500"></div>
                </div>
            </nav>

            {/* mobile overlay */}
            {!isExpanded && (
                <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30" />
            )}
        </>
    )
}
    //     return (
    //         <>
    //             {/* mobile toggle button */}
    //             <button
    //                 onClick={() => setIsExpanded(!isExpanded)}
    //                 className="lg:hidden fixed top-4 left-4 z-50 bg-orange-500 text-black px-4 py-2 rounded"
    //             >
    //                 {isExpanded ? 'CLOSE' : 'MENU'}
    //             </button>
    //             {/* navigation sidebar */}
    //             <nav className={
    //                 `fixed top-0 left-0 h-full bg-black border-r-4 border-orange-500 z-40 transition-all
    //             duration-300 ease-in-out ${isExpanded ? `w-64` : `w-16`} lg:w-64
    //         `}>
    //             {/* header */}
    //             <div className="p-4 border-b border-gray-700">
    //                 <div className="flex items-center justify-between">
    //                     <div className={`transition-opacity duration-300 ${isExpanded ? `opacity-100` : `opacity-0`} lg:opacity-100`}>
    //                         <h1 className="text-orange-400 font-bold text-lg">LCARS</h1>
    //                         <p className="text-blue-400 text-xs"> STARFLEET DATABASE</p>
    //                     </div>
    //                     <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
    //                 </div>
    //             </div>
    //             {/* nav items */}
    //             <div className="pt-8">
    //                 {navigationItems.map((item) => (
    //                     <Link
    //                         key={item.path}
    //                         to={item.path}
    //                         className={`
    //                         flex items-center px-4 py-4 mx-2 mb-2 rounded-r-full
    //                         transition-all duration-200 group relative
    //                         ${isActive(item.path)
    //                                 ? `bg-orange-500 text-black`
    //                                 : `text-gray-300 hover:bg-gray-800 hover:text-orange-400`}
    //                         `}
    //                     >
    //                         {/* id number */}
    //                         <span className="text-sm font-mono w-8">
    //                             {item.id}
    //                         </span>
    //                         {/* label */}
    //                         <span className={
    //                             `ml-4 font-semibold transition-opacity duration-300 
    //                         ${isExpanded ? `opacity-100` : 'opacity-0'} lg:opacity-100`
    //                         }>
    //                             {item.label}
    //                         </span>
    //                         {/* active indicator */}
    //                         {isActive(item.path) && (
    //                             <div className="absolute right-2 w-2 h-2 bg-blue-400 rounded-full"></div>
    //                         )}
    //                     </Link>
    //                 ))}
    //             </div>

    //             {/* status panel */}
    //             <div className={`
    //             absolute bottom-4 left-2 right-2 p-4 bg-gray-900 rounded transition-opacity duration-300
    //             ${isExpanded ? `opacity-100` : `opacity-0`} lg:opacity-100
    //         `}>
    //                 <div className="text-xs">
    //                     <div className="flex justify-between mb-2">
    //                         <span className="text-orange-400">STATUS:</span>
    //                         <span className="text-green-400">ONLINE</span>
    //                     </div>
    //                     <div className="flex justify-between mb-2">
    //                         <span className="text-orange-400">LOCATION:</span>
    //                         <span className="text-blue-400">SOL-3</span>
    //                     </div>
    //                     <div className="flex justify-between">
    //                         <span className="text-orange-400">ACCESS:</span>
    //                         <span className="text-purple-400">GUEST</span>
    //                     </div>
    //                 </div>
    //             </div>

    //             {/* expand/collapse button (desktop) */}
    //             <button
    //                 onClick={() => setIsExpanded(!isExpanded)}
    //                 className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 bg-orange-500 
    //                 rounded-full text-black text-xs font-bold hover:bg-orange-400 transition-colors duration-200"
    //             >
    //                 {isExpanded ? '◀' : '▶'}
    //             </button>
    //         </nav>
    //         {/* overlay for mobile */}
    //         {/* {isExpanded && (
    //             <div
    //                 className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
    //                 onClick={() => setIsExpanded(false)}
    //             ></div>
    //         )} */}
    //         </>
    //     )
    // }

    export default Navigation