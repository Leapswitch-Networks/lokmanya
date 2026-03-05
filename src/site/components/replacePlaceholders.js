export const replacePlaceholders = (text, values = {}) => {
  if (!text || typeof text !== 'string') return '';
  
  return text.replace(/\{(\w+)\}/g, (_, key) => {
    return values[key] || `{${key}}`;
  });
};

export default replacePlaceholders;