// Utility functions for localStorage operations
export const getStoredData = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting stored data for key ${key}:`, error);
    return null;
  }
};

export const setStoredData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error setting stored data for key ${key}:`, error);
  }
};

export const removeStoredData = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing stored data for key ${key}:`, error);
  }
};