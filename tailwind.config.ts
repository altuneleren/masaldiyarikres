import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        masal: {
          sun: "#FBBF24",
          sunDark: "#D97706",
          sunLight: "#FEF3C7",
          sky: "#38BDF8",
          skyDark: "#0284C7",
          skyLight: "#E0F2FE",
          mint: "#34D399",
          mintDark: "#059669",
          mintLight: "#D1FAE5",
          pink: "#F472B6",
          pinkDark: "#DB2777",
          pinkLight: "#FCE7F3",
          purple: "#A78BFA",
          purpleDark: "#7C3AED",
          purpleLight: "#EDE9FE",
          orange: "#FB923C",
          orangeDark: "#EA580C",
          orangeLight: "#FFEDD5",
          cream: "#FFFDF7",
          warmGray: "#F8FAFC",
        },
      },
      fontFamily: {
        sans: ["var(--font-fredoka)", "Comic Sans MS", "system-ui", "sans-serif"],
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-reverse": "floatReverse 7s ease-in-out infinite",
        "pulse-gentle": "pulseGentle 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(10px)" },
        },
        pulseGentle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.92", transform: "scale(1.02)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
