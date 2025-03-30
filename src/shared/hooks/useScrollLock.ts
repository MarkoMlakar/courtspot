import { useEffect, useRef } from 'react';
import { useMediaQuery } from './useMediaQuery';
import { MEDIA_QUERIES } from '../constants/breakpoints';

/**
 * A hook that prevents page scrolling when a modal/menu is open.
 * This is particularly useful for mobile/tablet views where we want to lock
 * the background content when overlays are displayed.
 *
 * The hook saves the current scroll position before locking,
 * prevents scrolling by fixing the body position,
 * and restores the scroll position when unlocking.
 */

export const useScrollLock = (isLocked: boolean) => {
  const scrollPositionRef = useRef(0);

  // Only check for desktop breakpoint
  const isDesktop = useMediaQuery(MEDIA_QUERIES.desktop);
  const isMobileOrTablet = !isDesktop;

  useEffect(() => {
    // Apply scroll lock if we're in mobile or tablet view and menu is opened
    if (isLocked && isMobileOrTablet) {
      // Save current scroll position before locking
      scrollPositionRef.current = window.scrollY;

      // Apply the same body locking behavior for both portrait and landscape
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.top = `-${scrollPositionRef.current}px`;
    } else {
      // If we're unlocking or in desktop mode, restore scroll
      const scrollY = parseInt(document.body.style.top || '0', 0) * -1;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.top = '';

      if (isMobileOrTablet) {
        // Restore scroll position
        window.scrollTo(0, scrollY || scrollPositionRef.current);
      }
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      document.body.classList.remove('no-scroll');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.top = '';
    };
  }, [isLocked, isMobileOrTablet]);
};
