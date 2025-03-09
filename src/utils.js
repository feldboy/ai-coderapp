/**
 * Creates a URL for a specific page and optional ID
 * @param {string} page - The page name
 * @param {string} id - Optional ID for the resource
 * @returns {string} The formatted URL
 */
export const createPageUrl = (page, id = null) => {
  if (id) {
    return `/${page}/${id}`;
  }
  return `/${page}`;
};

/**
 * Formats a date for display
 * @param {Date} date - The date to format
 * @returns {string} The formatted date string
 */
export const formatDate = (date) => {
  if (!date) return "";
  
  if (typeof date === "string") {
    date = new Date(date);
  }
  
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};