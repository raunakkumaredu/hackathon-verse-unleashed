
// Cache time calculations to avoid redundant calculations
const TIME_CACHE = new Map<string, string>();
const ONE_DAY = 1000 * 60 * 60 * 24;
const ONE_WEEK = ONE_DAY * 7;

export function formatTime(date: Date) {
  // Generate a cache key based on the timestamp
  const cacheKey = date.getTime().toString();
  
  // Check if we already calculated this time
  if (TIME_CACHE.has(cacheKey)) {
    return TIME_CACHE.get(cacheKey) as string;
  }
  
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  let result: string;
  
  if (diff < ONE_DAY) {
    // Today - show time
    result = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diff < ONE_DAY * 2) {
    // Yesterday
    result = 'Yesterday';
  } else if (diff < ONE_WEEK) {
    // This week - show day name
    result = date.toLocaleDateString([], { weekday: 'short' });
  } else {
    // Older - show date
    result = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
  
  // Cache the result (limit cache size to prevent memory issues)
  if (TIME_CACHE.size > 1000) {
    // Clear the oldest entries when cache gets too large
    const oldestKey = TIME_CACHE.keys().next().value;
    TIME_CACHE.delete(oldestKey);
  }
  TIME_CACHE.set(cacheKey, result);
  
  return result;
}
