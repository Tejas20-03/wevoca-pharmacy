import { useMediaQuery } from 'react-responsive';
import { Breakpoints } from '@/features/responsive';

export const useResponsive = () => {
  const isMobile = useMediaQuery({ maxWidth: Breakpoints.sm });
  const isTablet = useMediaQuery({ maxWidth: Breakpoints.md });
  const isLaptop = useMediaQuery({ maxWidth: Breakpoints.lg });
  const isDesktop = useMediaQuery({ maxWidth: Breakpoints.xl });
  return { isMobile, isTablet, isLaptop, isDesktop };
};
