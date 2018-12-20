/**
 * Generate a new clean object with all keys in lowercase (no-duplicates)
 * 
 * @param {Object} object 
 */
export function clean(object: {[k: string]: any}): {[k: string]: any} {
  return Object.keys(object).sort().reduce((container, key) => {
    // Get all keys as lowercase
    const lowerKey = key.toLowerCase();
    // Generate a new clean object with all keys in lowercase (no-duplicates)
    if (undefined === container[lowerKey]) {
      container[lowerKey] = object[key];
    }
    
    return container;
  }, {});
}
