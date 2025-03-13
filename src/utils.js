import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for conditionally joining class names
 * @param {...(string|Object)} inputs - Class names or conditional class objects
 * @returns {string} Merged class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Utility functions for routing and URL handling
 */

/**
 * Creates a URL path from a page name
 * @param {string} pageName - The name of the page
 * @returns {string} The URL path with leading slash
 */
export function createPageUrl(pageName) {
  //Basic page URL
  return `/${pageName.toLowerCase()}`;
}

/**
 * Creates a URL with query parameters
 * @param {string} pageName - The name of the page
 * @param {Object} params - Query parameters as key-value pairs
 * @returns {string} The URL with query parameters
 */
export function createUrlWithParams(pageName, params = {}) {
  const baseUrl = createPageUrl(pageName);
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value);
    }
  });
  
  const queryString = queryParams.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Checks if the current path matches a given page name
 * @param {string} currentPath - The current path from location.pathname
 * @param {string} pageName - The name of the page to check against
 * @returns {boolean} True if the current path matches the page name
 */
export function isActivePage(currentPath, pageName) {
  const pageUrl = createPageUrl(pageName);
  return currentPath === pageUrl || currentPath.startsWith(`${pageUrl}/`);
}

/**
 * Extracts parameters from the URL path
 * @param {string} pattern - The URL pattern with placeholders (e.g., '/chat/:storyId')
 * @param {string} path - The actual URL path
 * @returns {Object} An object with extracted parameters
 */
export function extractPathParams(pattern, path) {
  const params = {};
  const patternSegments = pattern.split('/');
  const pathSegments = path.split('/');
  
  patternSegments.forEach((segment, index) => {
    if (segment.startsWith(':') && pathSegments[index]) {
      const paramName = segment.slice(1);
      params[paramName] = pathSegments[index];
    }
  });
  
  return params;
}