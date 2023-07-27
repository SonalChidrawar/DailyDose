// Function to read data from Local Storage
export const getCachedData = (key) => {
    const cachedData = localStorage.getItem(key);
    return cachedData ? JSON.parse(cachedData) : null;
  };
  
  // Function to cache data in Local Storage
  export const cacheData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  
  // Function to clear old data using LRU strategy
  export const clearOldData = (keys, maxSize) => {
    const sortedKeys = keys.sort((a, b) => {
      return localStorage.getItem(b).timestamp - localStorage.getItem(a).timestamp;
    });
  
    let currentSize = 0;
    for (const key of sortedKeys) {
      const data = localStorage.getItem(key);
      const dataSize = data ? JSON.stringify(data).length : 0;
  
      if (currentSize + dataSize <= maxSize) {
        currentSize += dataSize;
      } else {
        localStorage.removeItem(key);
      }
    }
  };
  