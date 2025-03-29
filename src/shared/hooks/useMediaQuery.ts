import { useState, useEffect } from 'react';

/**
 * A custom hook that provides a way to check if a media query matches the current viewport.
 * This is particularly useful for responsive design, allowing components to react to screen size changes.
 * 
 * The hook takes a media query string as input and returns a boolean indicating whether
 * the query matches. It automatically updates when the viewport changes, triggering re-renders
 * of components using this hook.
 */

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      }
    };
  }, [query]);

  return matches;
};
