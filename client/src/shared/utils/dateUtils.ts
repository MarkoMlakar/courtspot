/**
 * Formats a date string into a human-readable format
 * @param dateString - Date string to format (can be null or undefined)
 * @param locale - Locale for date formatting (defaults to 'en-US')
 * @param options - Intl.DateTimeFormatOptions for custom formatting
 * @returns Formatted date string or empty string if invalid
 */
export const formatDateOfBirth = (
  dateString: string | null | undefined,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string => {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return '';
    }

    return date.toLocaleDateString(locale, options);
  } catch {
    return '';
  }
};

/**
 * Formats a date string to a short format (MM/DD/YYYY)
 * @param dateString - Date string to format
 * @returns Short formatted date string
 */
export const formatDateShort = (
  dateString: string | null | undefined
): string => {
  return formatDateOfBirth(dateString, 'en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};
