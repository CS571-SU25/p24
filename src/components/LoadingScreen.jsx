import { useState, useEffect } from 'react';

const LoadingScreen = ({ isLoading, currentPage }) => {
    const [isShowing, setIsShowing] = useState(false);
    const [isOpaque, setIsOpaque] = useState(false);

    useEffect(() => {
        if (isLoading) {
            setIsShowing(true);
            // Delay setting opacity to allow for mounting and transition
            const timer = setTimeout(() => setIsOpaque(true), 50);
            return () => clearTimeout(timer);
        } else {
            setIsOpaque(false);
        }
    }, [isLoading]);

    const handleTransitionEnd = () => {
        if (!isLoading) {
            setIsShowing(false);
        }
    };

    // Simple page-specific messages
    const pageMessages = {
        '/': 'ACCESSING STARFLEET DATABASE',
        '/about': 'LOADING PERSONNEL RECORDS',
        '/projects': 'SCANNING PROJECT ARCHIVE',
        '/tech-stack': 'ANALYZING TECHNOLOGY MATRIX',
        '/blog': 'RETRIEVING CAPTAIN\'S LOGS'
    };

    if (!isShowing) return null;

    const currentMessage = pageMessages[currentPage] || pageMessages['/'];

    return (
        <div
            className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-500 ${isOpaque ? 'opacity-100' : 'opacity-0'}`}
            onTransitionEnd={handleTransitionEnd}
        >
            <div className="text-center">
                {/* LCARS Logo */}
                <div className="text-orange-400 text-7xl font-bold mb-8" style={{ fontFamily: 'TNG, Orbitron, sans-serif' }}>
                    LCARS
                </div>
                
                {/* Loading message */}
                <div className="text-blue-300 text-xl tracking-widest mb-8">
                    {currentMessage}
                </div>

                {/* Simple status indicator */}
                <div className="flex items-center justify-center mt-8">
                    <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse mr-3"></div>
                    <span className="text-gray-400 text-sm tracking-wider">
                        LOADING...
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;