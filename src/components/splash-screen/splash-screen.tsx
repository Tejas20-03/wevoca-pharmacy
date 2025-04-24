import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './splash-screen.module.css';
import useWindowDimensions from '@/hooks/useWindowDimensions';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const [imageSrc, setImageSrc] = useState('/assets/splash-desktop.jpg');

  useEffect(() => {
    // Set appropriate image based on screen width
    if (windowWidth <= 768) {
      setImageSrc('/assets/splash-mobile.jpg');
    } else {
      setImageSrc('/assets/splash-desktop.jpg');
    }
  }, [windowWidth]);

  const handleArrowClick = () => {
    onComplete();
    router.push('/');
  };

  return (
    <div className={styles.splashContainer}>
      <div className={styles.imageContainer}>
        <Image 
          src={imageSrc}
          alt="Welcome to Wevoca Pharmacy" 
          fill 
          priority
          className={styles.splashImage}
        />
        <button 
          className={styles.arrowButton}
          onClick={handleArrowClick}
          aria-label="Enter Website"
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="white"/>
            <path d="M9 6L15 12L9 18" stroke="#008176" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;
