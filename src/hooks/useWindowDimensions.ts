import { useState, useEffect } from 'react'

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
}

export default function useWindowDimensions() {

    const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

    const handleResize = () => setWindowDimensions(getWindowDimensions());

    useEffect(() => {
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}
