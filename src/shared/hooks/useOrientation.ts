import { useState, useEffect } from 'react';

/**
 * A hook that returns the current orientation of the device.
 * This is particularly useful for responsive design, allowing components to react to screen orientation changes.
 *
 * The hook takes a media query string as input and returns a boolean indicating whether
 * the query matches. It automatically updates when the viewport changes, triggering re-renders
 * of components using this hook.
 */
type Orientation = 'portrait' | 'landscape';

export const useOrientation = (): Orientation => {
  const [orientation, setOrientation] = useState<Orientation>(
    window.matchMedia('(orientation: landscape)').matches
      ? 'landscape'
      : 'portrait'
  );

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(
        window.matchMedia('(orientation: landscape)').matches
          ? 'landscape'
          : 'portrait'
      );
    };

    const mediaQuery = window.matchMedia('(orientation: landscape)');

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleOrientationChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleOrientationChange);
      }
    };
  }, []);

  return orientation;
};
