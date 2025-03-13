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