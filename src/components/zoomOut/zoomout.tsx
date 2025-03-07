import React, { useEffect } from 'react';

function DisableZoomOut() {
    useEffect(() => {
        const handleTouchMove = (event) => {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        };

        document.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            document.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return <div>Your React component goes here</div>;
}

export default DisableZoomOut;
