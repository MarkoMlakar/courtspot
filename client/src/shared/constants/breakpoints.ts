/**
 * Breakpoints matching those defined in _mediaSize.scss
 * IMPORTANT: These must be kept in sync with $breakpoint-* variables in src/mixins/_mediaSize.scss
 * TODO: Add a node script which would generate the .scss and .ts files with breakpoints
 */

// Breakpoints in rem units
export const BREAKPOINTS = {
  xs: 30, // Small phones - $breakpoint-xs
  m: 48, // Tablets - $breakpoint-m
  l: 80, // Desktop - $breakpoint-l
} as const;

// Media query strings for use with useMediaQuery hook
export const MEDIA_QUERIES = {
  mobile: `(max-width: ${BREAKPOINTS.m - 0.06}rem)`,
  tablet: `(min-width: ${BREAKPOINTS.m}rem) and (max-width: ${BREAKPOINTS.l - 0.06}rem)`,
  desktop: `(min-width: ${BREAKPOINTS.l}rem)`,
} as const;
