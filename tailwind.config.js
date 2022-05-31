module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      Inter: ["Inter", "Helvetica"],
      Inter: ["Inter", "sans-serif"],
      "Space Grotesk": ["Space Grotesk", "sans-serif"],
    },
    fontWeight: {
      hairline: 100,
      "extra-light": 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      "extra-bold": 800,
      black: 900,
    },
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      lm: ["16px", "24px"],
      base: ["18px", "28px"],
      lg: ["20px", "28px"],
      xl: ["24px", "32px"],
    },
    screens: {
      smobile: { max: "539px" },
      // => @media (max-width: 360px) { ... }

      lmobile: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      mobile: { max: "768px" },
      // => @media (max-width: 768px) { ... }

      md: "769px",
      // => @media (min-width: 769px) { ... }

      sipad: { max: "1023px" },

      // => @media (max-width: 1023px) { ... }

      ipad: { max: "1024px" },
      // => @media (max-width: 1024px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      llg: "1025px",
      // => @media (min-width: 1025px) { ... }

      xl: "1440px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1680px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        "primary-focus": "var(--primary-focus)",
        secondary: "var(--secondary)",
        "secondary-hover": "var(--secondary-hover)",
        "link-color": "var(--link-color)",
        "link-color-hover": "var(--link-color-hover)",
        "body-background": "var(--body-background)",
        "link-color-hover": "var(--link-color-hover)",
        "body-text": "var(--body-text)",
        "body-text-invert": "var(--body-text-invert)",
        "secondary-background": "var(--secondary-background)",
        "secondary-text": "var(--secondary-text)",
        "title-text": "var(--title-text)",
        "footer-background": "var(--footer-background)",
        "footer-text": "var(--footer-text)",
        "card-background": "var(--card-background)",
        "card-text": "var(--card-text)",
        "card-border": "var(--card-border)",
        "cta-background": "var(--cta-background)",
        "cta-text": "var(--cta-text)",
        "sidebar-text": "var(--sidebar-text)",
        "sidebar-color": "var(--sidebar-color)",
        "sidebar-color-active": "var(--sidebar-color-active)",
        "tags-background": "var(--tags-background)",
        "tags-color": "var(--tags-color)",
        "button-background": "var(--button-background)",
        "button-text": "var(--button-text)",
        "button-background-secondary": "var(--button-background-secondary)",
        "button-text-secondary": "var(--button-text-secondary)",
        "box-shadow": "var(--box-shadow)",
        "notice-background": "var(--notice-background)",
        "success-background": "var(--success-background)",
        "warning-background": "var(--warning-background)",
        "bad-background": "var(--bad-background)",
        blue: {
          navy: "#090C43",
          "navy-light": "#1D1F52",
          "navy-lighter": "#2E305F",
          "navy-lightest": "#3F416C",
          periwinkle: "#4667C8",
          "periwinkle-hover": "#3955A7",
          "periwinkle-light": "#A5B9F3",
          "periwinkle-light-hover": "#4667C8",
          electric: "#005EF4",
          "electric-hover": "#0040D6",
          // The following are depricated and renamed into the Transparency section
          "light-navy": "#3F416C",
          "med-navy": "#2E305F",
          "dark-navy": "#1D1F52",
        },
        orange: {
          default: "#FF6900",
          hover: "#DB5A00",
        },
        gray: {
          default: "#737881",
          lightest: "#EBECEF",
          lighter: "#DBDCE1",
          light: "#C5C7CE",
          dark: "#494B51",
          hover: "#494B51",
          // The following are depricated and replaced with above
          med: "#737881",
          "light-alpha": "rgba(255, 255, 255, 0.22)",
          "med-alpha": "rgba(255, 255, 255, 0.15)",
        },
        transparency: {
          light: "rgba(255, 255, 255, 0.22)",
          medium: "rgba(255, 255, 255, 0.15)",
          dark: "rgba(255, 255, 255, 0.08)",
        },
        code: "#f5f5f5",
        white: "#FCFCFD",
        whitest: "#ffffff",
      },
      spacing: {
        7: "1.75rem",
        9: "2.25rem",
        11: "2.75rem",
        13: "3.25rem",
        14: "3.5rem",
        15: "3.75rem",
      },
      borderRadius: {
        "1rem": "1rem",
      },
    },
  },
  variants: {},
  plugins: [
    require("daisyui"),
    require("tailwind-scrollbar"),
    require("@tailwindcss/aspect-ratio"),
  ],
  daisyui: {
    themes: [
      {
        lpthemedark: {
          primary: "#3863e5",
          "primary-hover": "#204ac5",
          "primary-focus": "#1d4ee2",
          "primary-content": "#ffffff",

          secondary: "#EDEDFA",
          "secondary-hover": "#FCFCFC",
          "secondary-focus": "#FCFCFC",
          "secondary-content": "#ffffff",

          visited: "#a381ee",
          "visited-color-hover": "#b296ee",

          accent: "#4667c8",
          "accent-focus": "#3955a7",
          "accent-content": "#ffffff",

          neutral: "#ffffff",
          "neutral-focus": "#ebecef",
          "neutral-content": "#2a2b2e",

          "base-100": "#ffffff",
          "base-200": "#f7f7f9",
          "base-300": "#6f737c",
          "base-content": "#2a2b2e",

          info: "#f0f6fa",
          success: "#008738",
          warning: "#d65800",
          error: "#b00020",
        },

        // active
        lptheme: {
          primary: "#ff6900",
          "primary-focus": "#db5a00",
          "primary-content": "#ffffff",

          secondary: "#005ef4",
          "secondary-focus": "#0040d6",
          "secondary-content": "#ffffff",

          accent: "#4667c8",
          "accent-focus": "#3955a7",
          "accent-content": "#ffffff",

          neutral: "#ffffff",
          "neutral-focus": "#ebecef",
          "neutral-content": "#2a2b2e",

          "base-100": "#ffffff",
          "base-200": "#f7f7f9",
          "base-300": "#6f737c",
          "base-content": "#2a2b2e",

          info: "#4667c8",
          success: "#a0ca00",
          warning: "#ff6900",
          error: "#d72329",
        },
      },
    ],
  },
}
