/** @type {import('tailwindcss').Config} */
import { themeColors, themeShadows, themeRounding, themeSpacing } from './src/lib/theme.js';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: themeColors.primary,
        gray: themeColors.gray,
        success: themeColors.success,
        warning: themeColors.warning,
        danger: themeColors.danger,
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
      },
      borderRadius: themeRounding,
      boxShadow: themeShadows,
      spacing: themeSpacing,
    },
  },
  plugins: [],
}