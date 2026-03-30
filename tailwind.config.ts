import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./form/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        royal: "var(--color-royal)",
        sweetRed: "var(--color-sweetRed)",
        skyBlue: "var(--color-skyBlue)",
        white: "var(--color-white)",
        pastelYellow: "var(--color-pastelYellow)",
        gradientRed: "var(--color-gradientRed)",
        gradientXXI1: "var(--color-gradientXXI1)",
        gradientXXI2: "var(--color-gradientXXI2)",
        gradientBlue: "var(--color-gradientBlue)",
        defaultBtnColor: "var(--color-defaultBtnColor)",
        pressedBtnColor: "var(--color-pressedBtnColor)",
        hoverBtnColor: "var(--color-hoverBtnColor)",
        choosenBtnColor:'var(--color-choosenBtnColor)',
      }
    },
  },
  plugins: [require("tailwindcss-animate"),require('tailwind-scrollbar-hide')],
} satisfies Config;
