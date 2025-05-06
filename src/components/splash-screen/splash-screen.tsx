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
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // Set appropriate image based on screen width
    if (windowWidth <= 768) {
      setImageSrc('/assets/splash-mobile.jpg');
    } else {
      setImageSrc('/assets/splash-desktop.png');
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
        
        {/* Brand text in top left */}
        <div className={styles.brandTextContainer}>
          <h1 className={styles.brandName}>wevoca</h1>
          <p className={styles.brandTagline}>Discover the Art of Wellbeing!</p>
        </div>
        
        {/* Logo centered in the splash screen */}
        <div className={styles.logoContainer}>
          <Image 
            src="/assets/temp-green-small-logo.png" 
            alt="Wevoca Pharmacy Logo" 
            width={300} 
            height={300}
            quality={100}
            priority
          />
        </div>
        
        <button 
          className={styles.arrowButton}
          onClick={handleArrowClick}
          aria-label="Enter Website"
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="white"/>
            <path d="M9 6L15 12L9 18" stroke="#008176" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;
