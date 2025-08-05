import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import LoadingScreen from '../components/LoadingScreen';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState(location.pathname);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Initial load
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            setIsInitialLoad(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    // Handle navigation changes - this runs synchronously when location changes
    useEffect(() => {
        // Skip if this is the initial load
        if (isInitialLoad) {
            return;
        }

        // Immediately set loading to true to prevent flash
        setIsLoading(true);
        setCurrentPath(location.pathname);
        
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, [location.pathname, isInitialLoad]);

    const value = { 
        isLoading, 
        currentPath
    };

    return (
        <LoadingContext.Provider value={value}>
            <LoadingScreen isLoading={isLoading} currentPage={currentPath} />
            {!isLoading && children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};