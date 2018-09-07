export function clean(object: {[k: string]: any}): {[k: string]: any} {
  // Order alphabetically
  const sortedKeys = Object.keys(object).sort();
  
  // Clean all duplicate keys
  const unique = new Set(sortedKeys);
  
  // Generate the new clean object with all keys in lowercase 
  const newObject = {};
  Array.from(unique).forEach((key) => {
    newObject[key.toLowerCase()] = object[key];
  });

  return newObject;
}
