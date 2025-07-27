import React from 'react';
import { Stars } from '@react-three/drei';

/**
 * Reusable Starfield Component
 * Easy to reuse for all pages
 */

const Starfield = () => {
    return (
        <Stars
            radius={20} // big radius for realisticness
            depth={500}  // how deep the field is
            count={8000} // density of starfield for background
            factor={12}   // star size variation
            saturation={0.7} // color
            fade={true}  // fade stars based on distance
        />
    )
}

export default Starfield;