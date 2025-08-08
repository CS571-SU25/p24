import { useState, useEffect, useMemo} from 'react';
import enterpriseTop from "../assets/ncc1701-top-transparent.png"
import enterpriseIso from "../assets/ncc1701-iso-transparent.png"
import enterpriseFront from "../assets/ncc1701-front-transparent.png"


const STATUS_CYCLE = [
    "INITIALIZING SUBSPACE LINK",
    "AUTHENTICATING STARFLEET NODE",
    "SYNCING LCARS SUBROUTINES",
    "SCANNING ISOLINEAR CHIPS",
    "ALIGNING HEISENBERG COMPENSATORS"
]

const pageInfo = {
    '/': {
        msg: "ACCESSING STARFLEET DATABASE",
        img: enterpriseTop
    },
    '/about': {
        msg: "LOADING PERSONNEL RECORDS",
        img: enterpriseIso
    },
    '/projects': {
        msg: "SCANNING PROJECT ARCHIVE",
        img: enterpriseFront
    },
}

const LoadingScreen = ({ isLoading, currentPage }) => {
    const [mounted, setMounted] = useState(false);
    const [isOpaque, setIsOpaque] = useState(false);
    const [tick, setTick] = useState(0);

    const page = pageInfo[currentPage] ?? pageInfo["/"];
    const message = useMemo(() => page.msg, [page]);

    useEffect(() => {
        if (isLoading) {
            setMounted(true);
            const timer = setTimeout(() => setIsOpaque(true), 30);
            return () => clearTimeout(timer);
        } else {
            setIsOpaque(false);
        }
    }, [isLoading]);

    // rotate little status line while visible
    useEffect(() => {
        if (!mounted) return;
        const id = setInterval(() => setTick((t) => (t + 1) % STATUS_CYCLE.length), 1600);
        return () => clearInterval(id);
    }, [mounted])

    const handleTransitionEnd = () => {
        if (!isLoading) {
            setMounted(false);
        }
    };

    if (!mounted) return null;

    return (
        <div
            className={`lcars-loading-overlay fixed inset-0 z-[9999] transition-opacity duration-500 ${isOpaque ? "opacity-100" : "opacity-0"
                }`}
            onTransitionEnd={handleTransitionEnd}
            aria-live="polite"
            role="status"
        >
            {/* center panel */}
            <div className="lcars-panel">
                <figure className="lcars-ship-wrap" aria-hidden>
                    <img 
                    src={page.img} 
                    alt={`An image of the Constitution Class USS Enterprise `} 
                    className="lcars-ship"
                    draggable="false"
                    />
                    <span className="lcars-ship-glow" />
                    <span className="lcars-ship-reflection" />
                    <span className="lcars-ship-scanlines" />
                </figure>

                <div
                    className="lcars-logo lcars-glow-orange"
                    style={{ fontFamily: "TNG, Orbitron, sans-serif" }}
                >
                    LCARS
                </div>

                <div className="lcars-subtitle">{message}</div>

                {/* segmented progress bar */}
                <div className="lcars-segbar" aria-label="Loading progress">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <span
                            // stagger the animation for each segment
                            key={i}
                            style={{ animationDelay: `${i * 90}ms` }}
                            className="lcars-seg"
                        />
                    ))}
                </div>

                {/* small status ticker */}
                <div className="lcars-ticker">
                    <span className="lcars-dot" />
                    <span className="lcars-ticker-text">
                        {STATUS_CYCLE[tick]}
                    </span>
                </div>
            </div>

            {/* subtle corner badge */}
            <div className="lcars-corner-id">
                NCC-1701 • UX OPS
            </div>
        </div>
    );
};

export default LoadingScreen;